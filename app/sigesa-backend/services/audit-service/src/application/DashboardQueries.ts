import { query } from '@sigesa/shared';
import type { IndicatorStatus } from '@sigesa/shared';

export class DashboardQueries {
  async coordinatorDashboard(programId: string) {
    const program = await query<{ name: string }>(
      `SELECT name FROM academic_program WHERE id = $1`,
      [programId],
    );

    const phases = await query(
      `SELECT ph.id, tp.name, pcv.current_state
       FROM phase ph
       JOIN template_phase tp ON tp.id = ph.template_phase_id
       LEFT JOIN phase_current_view pcv ON pcv.phase_id = ph.id
       JOIN accreditation_process pr ON pr.id = ph.process_id
       WHERE pr.program_id = $1`,
      [programId],
    );

    const indicators = await query<{
      id: string;
      code: string;
      current_state: IndicatorStatus | null;
    }>(
      `SELECT i.id, ic.code, icv.current_state
       FROM indicator i
       JOIN indicator_catalog ic ON ic.id = i.catalog_id
       JOIN phase ph ON ph.id = i.phase_id
       JOIN accreditation_process pr ON pr.id = ph.process_id
       LEFT JOIN indicator_current_view icv ON icv.indicator_id = i.id
       WHERE pr.program_id = $1`,
      [programId],
    );

    const observations = await query(
      `SELECT o.id, o.indicator_id, o.justification, o.created_at
       FROM observation o
       JOIN indicator i ON i.id = o.indicator_id
       JOIN phase ph ON ph.id = i.phase_id
       JOIN accreditation_process pr ON pr.id = ph.process_id
       WHERE pr.program_id = $1
       AND EXISTS (
         SELECT 1 FROM indicator_current_view v
         WHERE v.indicator_id = i.id AND v.current_state = 'OBSERVADO'
       )`,
      [programId],
    );

    return {
      programId,
      programName: program.rows[0]?.name ?? '',
      phases: phases.rows.map((p) => ({
        id: p.id,
        name: p.name,
        status: p.current_state ?? 'ABIERTA',
      })),
      indicators: indicators.rows.map((i) => ({
        id: i.id,
        code: i.code,
        status: i.current_state ?? 'PENDIENTE',
      })),
      openObservations: observations.rows.map((o) => ({
        id: o.id,
        indicatorId: o.indicator_id,
        reason: o.justification,
        createdAt: (o.created_at as Date).toISOString(),
      })),
    };
  }

  async technicianDashboard(filters?: {
    programId?: string;
    phaseId?: string;
    status?: string;
  }) {
    let sql = `
      SELECT i.id, ic.code, icv.current_state
      FROM indicator i
      JOIN indicator_catalog ic ON ic.id = i.catalog_id
      JOIN phase ph ON ph.id = i.phase_id
      JOIN accreditation_process pr ON pr.id = ph.process_id
      LEFT JOIN indicator_current_view icv ON icv.indicator_id = i.id
      WHERE 1=1`;
    const params: unknown[] = [];
    let n = 1;
    if (filters?.programId) {
      sql += ` AND pr.program_id = $${n++}`;
      params.push(filters.programId);
    }
    if (filters?.phaseId) {
      sql += ` AND ph.id = $${n++}`;
      params.push(filters.phaseId);
    }
    if (filters?.status) {
      sql += ` AND icv.current_state = $${n++}`;
      params.push(filters.status);
    } else {
      sql += ` AND icv.current_state IN ('SUBIDO', 'SUBSANADO')`;
    }

    const res = await query(sql, params);
    return {
      pendingIndicators: res.rows.map((r) => ({
        id: r.id,
        code: r.code,
        status: r.current_state,
      })),
      total: res.rows.length,
    };
  }
}
