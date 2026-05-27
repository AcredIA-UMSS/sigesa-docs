import { query, DB_TO_ROLE } from '@sigesa/shared';
import type { ActorRoleDb, IndicatorStatus } from '@sigesa/shared';
import type {
  IndicatorQueryPort,
  ObservationRepositoryPort,
  StateHistoryRepositoryPort,
  StateHistoryRow,
} from '../../ports/repositories.js';

export class RDSStateHistoryRepository implements StateHistoryRepositoryPort {
  async insertTransition(params: {
    indicatorId: string;
    previousState: IndicatorStatus;
    newState: IndicatorStatus;
    reason: string | null;
    correlationId: string;
    userId: string;
    role: ActorRoleDb;
  }): Promise<string> {
    const res = await query<{ id: string }>(
      `INSERT INTO indicator_state_history (
        indicator_id, previous_state, new_state, reason,
        correlation_id, created_by, created_by_role
      ) VALUES ($1,$2,$3,$4,$5::uuid,$6,$7) RETURNING id`,
      [
        params.indicatorId,
        params.previousState,
        params.newState,
        params.reason,
        params.correlationId,
        params.userId,
        params.role,
      ],
    );
    return res.rows[0].id;
  }

  async getHistory(indicatorId: string): Promise<StateHistoryRow[]> {
    const res = await query(
      `SELECT id, previous_state, new_state, created_by_role, created_at, correlation_id
       FROM indicator_state_history WHERE indicator_id = $1 ORDER BY created_at DESC`,
      [indicatorId],
    );
    return res.rows.map((r) => ({
      stateHistoryId: r.id as string,
      previousState: r.previous_state as IndicatorStatus,
      newState: r.new_state as IndicatorStatus,
      createdByRole: r.created_by_role as ActorRoleDb,
      createdAt: r.created_at as Date,
      correlationId: r.correlation_id as string,
    }));
  }

  async getCurrentState(indicatorId: string): Promise<IndicatorStatus | null> {
    const res = await query<{ current_state: IndicatorStatus }>(
      `SELECT current_state FROM indicator_current_view WHERE indicator_id = $1`,
      [indicatorId],
    );
    return res.rows[0]?.current_state ?? null;
  }

  async isEventProcessed(correlationId: string): Promise<boolean> {
    const res = await query(
      `SELECT 1 FROM processed_events WHERE correlation_id = $1::uuid`,
      [correlationId],
    );
    return res.rows.length > 0;
  }

  async markEventProcessed(correlationId: string, eventType: string): Promise<void> {
    await query(
      `INSERT INTO processed_events (correlation_id, event_type) VALUES ($1::uuid, $2)
       ON CONFLICT DO NOTHING`,
      [correlationId, eventType],
    );
  }
}

export class RDSObservationRepository implements ObservationRepositoryPort {
  async insertObservation(params: {
    indicatorId: string;
    justification: string;
    userId: string;
    version: number;
    supersedesId: string | null;
  }): Promise<string> {
    const res = await query<{ id: string }>(
      `INSERT INTO observation (
        indicator_id, version, supersedes_id, justification, created_by, created_by_role
      ) VALUES ($1,$2,$3,$4,$5,'TD') RETURNING id`,
      [
        params.indicatorId,
        params.version,
        params.supersedesId,
        params.justification,
        params.userId,
      ],
    );
    return res.rows[0].id;
  }

  async listObservations(indicatorId: string) {
    const res = await query(
      `SELECT o.id, o.justification, o.supersedes_id, o.created_by_role, o.created_at,
              ev.id AS evidence_version_id
       FROM observation o
       LEFT JOIN evidence_version ev ON ev.observation_id = o.id
       WHERE o.indicator_id = $1 ORDER BY o.created_at DESC`,
      [indicatorId],
    );
    return res.rows.map((r) => ({
      observationId: r.id as string,
      evidenceId: (r.evidence_version_id as string) ?? null,
      reason: r.justification as string,
      linkedObservationId: (r.supersedes_id as string) ?? null,
      createdByRole: DB_TO_ROLE[r.created_by_role as ActorRoleDb] ?? 'DueaTechnician',
      createdAt: (r.created_at as Date).toISOString(),
    }));
  }

  async linkEvidenceVersionToObservation(
    evidenceVersionId: string,
    observationId: string,
  ): Promise<void> {
    await query(
      `UPDATE evidence_version SET observation_id = $2 WHERE id = $1`,
      [evidenceVersionId, observationId],
    );
  }

  async getObservationCount(indicatorId: string): Promise<number> {
    const res = await query<{ count: string }>(
      `SELECT COUNT(*)::text AS count FROM observation WHERE indicator_id = $1`,
      [indicatorId],
    );
    return parseInt(res.rows[0].count, 10);
  }
}

export class RDSIndicatorQuery implements IndicatorQueryPort {
  async getPhaseId(indicatorId: string): Promise<string | null> {
    const res = await query<{ phase_id: string }>(
      `SELECT phase_id FROM indicator WHERE id = $1`,
      [indicatorId],
    );
    return res.rows[0]?.phase_id ?? null;
  }

  async countByPhaseAndState(phaseId: string) {
    const res = await query<{ approved: string; total: string }>(
      `SELECT
        COUNT(*) FILTER (WHERE icv.current_state = 'APROBADO')::text AS approved,
        COUNT(*)::text AS total
       FROM indicator i
       LEFT JOIN indicator_current_view icv ON icv.indicator_id = i.id
       WHERE i.phase_id = $1`,
      [phaseId],
    );
    return {
      approved: parseInt(res.rows[0]?.approved ?? '0', 10),
      total: parseInt(res.rows[0]?.total ?? '0', 10),
    };
  }

  async indicatorBelongsToProgram(
    indicatorId: string,
    programId: string,
  ): Promise<boolean> {
    const res = await query<{ ok: boolean }>(
      `SELECT EXISTS (
        SELECT 1 FROM indicator i
        JOIN phase ph ON ph.id = i.phase_id
        JOIN accreditation_process p ON p.id = ph.process_id
        WHERE i.id = $1 AND p.program_id = $2
      ) AS ok`,
      [indicatorId, programId],
    );
    return res.rows[0]?.ok ?? false;
  }

  async getProgramForIndicator(indicatorId: string) {
    const res = await query<{
      program_id: string;
      program_name: string;
      phase_id: string;
    }>(
      `SELECT ap.id AS program_id, ap.name AS program_name, i.phase_id
       FROM indicator i
       JOIN phase ph ON ph.id = i.phase_id
       JOIN accreditation_process pr ON pr.id = ph.process_id
       JOIN academic_program ap ON ap.id = pr.program_id
       WHERE i.id = $1`,
      [indicatorId],
    );
    const r = res.rows[0];
    if (!r) return null;
    return {
      programId: r.program_id,
      programName: r.program_name,
      phaseId: r.phase_id,
    };
  }
}
