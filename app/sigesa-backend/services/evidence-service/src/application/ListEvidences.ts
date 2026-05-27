import { DB_TO_ROLE, type JwtRole } from '@sigesa/shared';
import { AppError, ErrorCodes } from '@sigesa/shared';
import type { BlobStoragePort, EvidenceRepositoryPort } from '../ports/secondary.js';

export class ListEvidencesUseCase {
  constructor(
    private readonly evidenceRepo: EvidenceRepositoryPort,
    private readonly blobStorage: BlobStoragePort,
  ) {}

  async execute(params: {
    indicatorId: string;
    page: number;
    pageSize: number;
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

    const { rows, total } = await this.evidenceRepo.listVersions(
      params.indicatorId,
      params.page,
      params.pageSize,
    );

    const evidences = await Promise.all(
      rows.map(async (r) => ({
        evidenceId: r.id,
        version: r.version,
        supersedesId: r.supersedesId,
        observationId: r.observationId,
        s3PresignedUrl: await this.blobStorage.getPresignedUrl(r.storageKey, 900),
        contentSha256: r.contentSha256,
        createdByRole: DB_TO_ROLE[r.createdByRole] ?? r.createdByRole,
        createdAt: r.createdAt.toISOString(),
      })),
    );

    return {
      indicatorId: params.indicatorId,
      evidences,
      total,
      page: params.page,
    };
  }
}
