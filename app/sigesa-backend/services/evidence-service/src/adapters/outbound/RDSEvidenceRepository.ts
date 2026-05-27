import { query } from '@sigesa/shared';
import type { ActorRoleDb } from '@sigesa/shared';
import type {
  EvidenceRepositoryPort,
  EvidenceVersionRow,
} from '../../ports/secondary.js';

function mapRow(r: Record<string, unknown>): EvidenceVersionRow {
  return {
    id: r.id as string,
    evidenceId: r.evidence_id as string,
    version: r.version as number,
    supersedesId: (r.supersedes_id as string) ?? null,
    storageKey: r.storage_key as string,
    contentSha256: r.content_sha256 as string,
    byteSize: Number(r.byte_size),
    mimeType: r.mime_type as string,
    observationId: (r.observation_id as string) ?? null,
    createdByRole: r.created_by_role as ActorRoleDb,
    createdAt: r.created_at as Date,
  };
}

export class RDSEvidenceRepository implements EvidenceRepositoryPort {
  async findOrCreateEvidence(
    indicatorId: string,
    userId: string,
    role: ActorRoleDb,
  ): Promise<string> {
    const existing = await query<{ id: string }>(
      `SELECT id FROM evidence WHERE indicator_id = $1`,
      [indicatorId],
    );
    if (existing.rows[0]) return existing.rows[0].id;

    const inserted = await query<{ id: string }>(
      `INSERT INTO evidence (indicator_id, created_by, created_by_role)
       VALUES ($1, $2, $3) RETURNING id`,
      [indicatorId, userId, role],
    );
    return inserted.rows[0].id;
  }

  async getLatestVersion(evidenceId: string): Promise<EvidenceVersionRow | null> {
    const res = await query(
      `SELECT * FROM evidence_version WHERE evidence_id = $1
       ORDER BY version DESC LIMIT 1`,
      [evidenceId],
    );
    return res.rows[0] ? mapRow(res.rows[0]) : null;
  }

  async insertVersion(params: {
    evidenceId: string;
    version: number;
    supersedesId: string | null;
    storageKey: string;
    contentSha256: string;
    byteSize: number;
    mimeType: string;
    observationId: string | null;
    userId: string;
    role: ActorRoleDb;
  }): Promise<EvidenceVersionRow> {
    const res = await query(
      `INSERT INTO evidence_version (
        evidence_id, version, supersedes_id, storage_key, content_sha256,
        byte_size, mime_type, observation_id, created_by, created_by_role
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
      [
        params.evidenceId,
        params.version,
        params.supersedesId,
        params.storageKey,
        params.contentSha256,
        params.byteSize,
        params.mimeType,
        params.observationId,
        params.userId,
        params.role,
      ],
    );
    return mapRow(res.rows[0]);
  }

  async listVersions(
    indicatorId: string,
    page: number,
    pageSize: number,
  ): Promise<{ rows: EvidenceVersionRow[]; total: number }> {
    const offset = (page - 1) * pageSize;
    const countRes = await query<{ count: string }>(
      `SELECT COUNT(*)::text AS count FROM evidence_version ev
       JOIN evidence e ON e.id = ev.evidence_id WHERE e.indicator_id = $1`,
      [indicatorId],
    );
    const res = await query(
      `SELECT ev.* FROM evidence_version ev
       JOIN evidence e ON e.id = ev.evidence_id
       WHERE e.indicator_id = $1
       ORDER BY ev.version DESC LIMIT $2 OFFSET $3`,
      [indicatorId, pageSize, offset],
    );
    return {
      rows: res.rows.map(mapRow),
      total: parseInt(countRes.rows[0].count, 10),
    };
  }

  async getVersionById(
    indicatorId: string,
    evidenceVersionId: string,
  ): Promise<EvidenceVersionRow | null> {
    const res = await query(
      `SELECT ev.* FROM evidence_version ev
       JOIN evidence e ON e.id = ev.evidence_id
       WHERE e.indicator_id = $1 AND ev.id = $2`,
      [indicatorId, evidenceVersionId],
    );
    return res.rows[0] ? mapRow(res.rows[0]) : null;
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
}
