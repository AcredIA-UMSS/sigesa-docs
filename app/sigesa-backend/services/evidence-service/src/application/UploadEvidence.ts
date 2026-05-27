import { createHash } from 'crypto';
import { EventTypes, ROLE_TO_DB, type JwtRole } from '@sigesa/shared';
import { assertUploadAllowed } from '../domain/EvidenceUploadRule.js';
import type {
  BlobStoragePort,
  EvidenceRepositoryPort,
  EventPublisherPort,
  IndicatorStateQueryPort,
} from '../ports/secondary.js';

export interface UploadEvidenceCommand {
  indicatorId: string;
  buffer: Buffer;
  mimeType: string;
  observationId: string | null;
  userId: string;
  role: JwtRole;
  correlationId: string;
}

export interface UploadEvidenceResult {
  evidenceId: string;
  version: number;
  s3Key: string;
}

export class UploadEvidenceUseCase {
  constructor(
    private readonly evidenceRepo: EvidenceRepositoryPort,
    private readonly stateQuery: IndicatorStateQueryPort,
    private readonly blobStorage: BlobStoragePort,
    private readonly events: EventPublisherPort,
  ) {}

  async execute(cmd: UploadEvidenceCommand): Promise<UploadEvidenceResult> {
    const currentState = await this.stateQuery.getCurrentState(cmd.indicatorId);
    assertUploadAllowed(currentState, cmd.observationId);

    const dbRole = ROLE_TO_DB[cmd.role];
    const evidenceId = await this.evidenceRepo.findOrCreateEvidence(
      cmd.indicatorId,
      cmd.userId,
      dbRole,
    );

    const latest = await this.evidenceRepo.getLatestVersion(evidenceId);
    const nextVersion = (latest?.version ?? 0) + 1;
    const supersedesId = latest?.id ?? null;

    const sha256 = createHash('sha256').update(cmd.buffer).digest('hex');
    const storageKey = `evidence/${cmd.indicatorId}/v${nextVersion}-${Date.now()}`;

    await this.blobStorage.save(storageKey, cmd.buffer, cmd.mimeType);

    const row = await this.evidenceRepo.insertVersion({
      evidenceId,
      version: nextVersion,
      supersedesId,
      storageKey,
      contentSha256: sha256,
      byteSize: cmd.buffer.length,
      mimeType: cmd.mimeType,
      observationId: cmd.observationId,
      userId: cmd.userId,
      role: dbRole,
    });

    const eventType =
      currentState === 'OBSERVADO' || cmd.observationId
        ? EventTypes.EvidenceSubsanated
        : EventTypes.EvidenceUploaded;

    await this.events.publish({
      type: eventType,
      version: 1,
      timestamp: new Date().toISOString(),
      correlationId: cmd.correlationId,
      payload: {
        indicatorId: cmd.indicatorId,
        evidenceVersionId: row.id,
        evidenceId,
        version: row.version,
        actorId: cmd.userId,
        actorRole: cmd.role,
        observationId: cmd.observationId,
      },
    });

    return {
      evidenceId: row.id,
      version: row.version,
      s3Key: storageKey,
    };
  }
}
