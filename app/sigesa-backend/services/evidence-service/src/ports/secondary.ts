import type { IndicatorStatus, ActorRoleDb } from '@sigesa/shared';
import type { DomainEventEnvelope } from '@sigesa/shared';

export interface EvidenceVersionRow {
  id: string;
  evidenceId: string;
  version: number;
  supersedesId: string | null;
  storageKey: string;
  contentSha256: string;
  byteSize: number;
  mimeType: string;
  observationId: string | null;
  createdByRole: ActorRoleDb;
  createdAt: Date;
}

export interface BlobStoragePort {
  save(key: string, buffer: Buffer, mimeType: string): Promise<void>;
  getPresignedUrl(storageKey: string, expiresSeconds?: number): Promise<string>;
}

export interface EvidenceRepositoryPort {
  findOrCreateEvidence(indicatorId: string, userId: string, role: ActorRoleDb): Promise<string>;
  getLatestVersion(evidenceId: string): Promise<EvidenceVersionRow | null>;
  insertVersion(params: {
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
  }): Promise<EvidenceVersionRow>;
  listVersions(
    indicatorId: string,
    page: number,
    pageSize: number,
  ): Promise<{ rows: EvidenceVersionRow[]; total: number }>;
  getVersionById(
    indicatorId: string,
    evidenceVersionId: string,
  ): Promise<EvidenceVersionRow | null>;
  indicatorBelongsToProgram(indicatorId: string, programId: string): Promise<boolean>;
}

export interface IndicatorStateQueryPort {
  getCurrentState(indicatorId: string): Promise<IndicatorStatus | null>;
}

export interface EventPublisherPort {
  publish(event: DomainEventEnvelope): Promise<void>;
}
