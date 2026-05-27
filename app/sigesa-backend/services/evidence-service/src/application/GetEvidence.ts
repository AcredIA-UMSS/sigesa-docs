import type { JwtRole } from '@sigesa/shared';
import { AppError, ErrorCodes } from '@sigesa/shared';
import type { BlobStoragePort, EvidenceRepositoryPort } from '../ports/secondary.js';

export class GetEvidenceUseCase {
  constructor(
    private readonly evidenceRepo: EvidenceRepositoryPort,
    private readonly blobStorage: BlobStoragePort,
  ) {}

  async execute(params: {
    indicatorId: string;
    evidenceVersionId: string;
    userRole: JwtRole;
    programScope: string | null;
  }) {
    if (
      params.userRole === 'ProgramCoordinator' &&
      params.programScope &&
      !(await this.evidenceRepo.indicatorBelongsToProgram(
        params.indicatorId,
        params.programScope,
      ))
    ) {
      throw new AppError(ErrorCodes.FORBIDDEN, 'Sin acceso a esta carrera', 403);
    }

    const row = await this.evidenceRepo.getVersionById(
      params.indicatorId,
      params.evidenceVersionId,
    );
    if (!row) {
      throw new AppError(ErrorCodes.EVIDENCE_NOT_FOUND, 'Evidence no encontrada', 404, {
        evidenceId: params.evidenceVersionId,
      });
    }

    return {
      evidenceId: row.id,
      version: row.version,
      s3PresignedUrl: await this.blobStorage.getPresignedUrl(row.storageKey, 900),
      contentSha256: row.contentSha256,
    };
  }
}
