import { Router, type Request, type Response, type NextFunction } from 'express';
import {
  authMiddleware,
  requireRoles,
  evidenceUpload,
  multerErrorHandler,
  idempotencyMiddleware,
} from '@sigesa/shared';
import { createEventPublisher } from '@sigesa/shared';
import { RDSEvidenceRepository } from '../../outbound/RDSEvidenceRepository.js';
import { RDSIndicatorStateQuery } from '../../outbound/RDSIndicatorStateQuery.js';
import { S3BlobAdapter } from '../../outbound/S3BlobAdapter.js';
import { UploadEvidenceUseCase } from '../../../application/UploadEvidence.js';
import { ListEvidencesUseCase } from '../../../application/ListEvidences.js';
import { GetEvidenceUseCase } from '../../../application/GetEvidence.js';

const repo = new RDSEvidenceRepository();
const stateQuery = new RDSIndicatorStateQuery();
const s3 = new S3BlobAdapter();
const events = createEventPublisher();

const uploadUC = new UploadEvidenceUseCase(repo, stateQuery, s3, events);
const listUC = new ListEvidencesUseCase(repo, s3);
const getUC = new GetEvidenceUseCase(repo, s3);

export const evidenceRouter = Router();

evidenceRouter.post(
  '/indicators/:indicatorId/evidences',
  authMiddleware,
  requireRoles('ProgramCoordinator'),
  idempotencyMiddleware,
  evidenceUpload.single('evidenceBlob'),
  multerErrorHandler,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const file = req.file;
      if (!file) {
        res.status(400).json({
          error: { code: 'VALIDATION_ERROR', message: 'evidenceBlob es requerido' },
        });
        return;
      }
      const observationId =
        (req.body.observationId as string) || null;
      const result = await uploadUC.execute({
        indicatorId: String(req.params.indicatorId),
        buffer: file.buffer,
        mimeType: file.mimetype || 'application/octet-stream',
        observationId,
        userId: req.user!.sub,
        role: req.user!.role,
        correlationId: (req.headers['x-correlation-id'] as string) || crypto.randomUUID(),
      });
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  },
);

evidenceRouter.get(
  '/indicators/:indicatorId/evidences',
  authMiddleware,
  requireRoles('ProgramCoordinator', 'DueaTechnician', 'DueaAdministrator'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = Math.max(1, parseInt(String(req.query.page ?? '1'), 10));
      const pageSize = Math.min(
        100,
        Math.max(1, parseInt(String(req.query.pageSize ?? '20'), 10)),
      );
      const result = await listUC.execute({
        indicatorId: String(req.params.indicatorId),
        page,
        pageSize,
        userRole: req.user!.role,
        programScope: req.user!.programScope,
      });
      res.json(result);
    } catch (e) {
      next(e);
    }
  },
);

evidenceRouter.get(
  '/indicators/:indicatorId/evidences/:evidenceId',
  authMiddleware,
  requireRoles('ProgramCoordinator', 'DueaTechnician', 'DueaAdministrator'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await getUC.execute({
        indicatorId: String(req.params.indicatorId),
        evidenceVersionId: String(req.params.evidenceId),
        userRole: req.user!.role,
        programScope: req.user!.programScope,
      });
      res.json(result);
    } catch (e) {
      next(e);
    }
  },
);
