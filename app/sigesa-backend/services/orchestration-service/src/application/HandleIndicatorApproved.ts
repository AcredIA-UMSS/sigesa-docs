import {
  EventTypes,
  query,
  type DomainEventEnvelope,
  type IndicatorApprovedPayload,
} from '@sigesa/shared';
import { canClosePhase } from '../domain/PhaseCloseRule.js';

/**
 * ADR_011: en producción este handler consume SQS FIFO (MessageGroupId = phaseId).
 * MVP dev: invocación serial vía webhook /internal/events.
 */
export class HandleIndicatorApprovedEvent {
  async execute(envelope: DomainEventEnvelope<IndicatorApprovedPayload>): Promise<void> {
    if (envelope.type !== EventTypes.IndicatorApproved) return;

    const processed = await query(
      `SELECT 1 FROM processed_events WHERE correlation_id = $1::uuid`,
      [envelope.correlationId],
    );
    if (processed.rows.length > 0) return;

    const phaseId = envelope.payload.phaseId;
    if (!phaseId) return;

    const aggRes = await query<{ approved: string; total: string }>(
      `SELECT
        COUNT(*) FILTER (WHERE icv.current_state = 'APROBADO')::text AS approved,
        COUNT(*)::text AS total
       FROM indicator i
       LEFT JOIN indicator_current_view icv ON icv.indicator_id = i.id
       WHERE i.phase_id = $1`,
      [phaseId],
    );
    const approved = parseInt(aggRes.rows[0]?.approved ?? '0', 10);
    const total = parseInt(aggRes.rows[0]?.total ?? '0', 10);

    await query(
      `INSERT INTO processed_events (correlation_id, event_type) VALUES ($1::uuid, $2)
       ON CONFLICT DO NOTHING`,
      [envelope.correlationId, envelope.type],
    );

    if (!canClosePhase({ approved, total })) {
      return;
    }

    const existing = await query(
      `SELECT 1 FROM phase_state_history
       WHERE phase_id = $1 AND new_state = 'COMPLETADA'`,
      [phaseId],
    );
    if (existing.rows.length > 0) return;

    const systemUser = await query<{ id: string }>(
      `SELECT id FROM app_user WHERE email = 'jd.demo@umss.edu.bo' LIMIT 1`,
    );
    const actorId = systemUser.rows[0]?.id;
    if (!actorId) return;

    const prevRes = await query<{ current_state: string }>(
      `SELECT current_state FROM phase_current_view WHERE phase_id = $1`,
      [phaseId],
    );
    const previousState = prevRes.rows[0]?.current_state ?? 'ABIERTA';

    await query(
      `INSERT INTO phase_state_history (
        phase_id, previous_state, new_state, reason, correlation_id, created_by, created_by_role
      ) VALUES ($1, $2::phase_status, 'COMPLETADA'::phase_status, $3, $4::uuid, $5, 'SYSTEM')`,
      [
        phaseId,
        previousState,
        'Hard constraint: todos los indicadores APROBADO',
        envelope.correlationId,
        actorId,
      ],
    );

    console.info('[Orchestration] PhaseCompleted', { phaseId, approved, total });
  }
}
