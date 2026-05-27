import { Router } from 'express';
import {
  authMiddleware,
  requireRoles,
  idempotencyMiddleware,
  AppError,
  ErrorCodes,
  verifyInternalSecret,
  DB_TO_ROLE,
} from '@sigesa/shared';
import type { DomainEventEnvelope, EvidenceUploadedPayload } from '@sigesa/shared';
import {
  RDSStateHistoryRepository,
  RDSObservationRepository,
  RDSIndicatorQuery,
} from '../../outbound/RDSRepositories.js';
import { createOrchestrationPublisher } from '../../outbound/createOrchestrationPublisher.js';
import { HandleEvidenceUploadedEvent } from '../../../application/HandleEvidenceEvent.js';
import { ApproveIndicatorUseCase } from '../../../application/ApproveIndicator.js';
import { RejectIndicatorUseCase } from '../../../application/RejectIndicator.js';
import { AuthLoginUseCase } from '../../../application/AuthLogin.js';
import { DashboardQueries } from '../../../application/DashboardQueries.js';

const stateHistory = new RDSStateHistoryRepository();
const observations = new RDSObservationRepository();
const indicators = new RDSIndicatorQuery();
const orchestrationEvents = createOrchestrationPublisher();

const handleEvidence = new HandleEvidenceUploadedEvent(stateHistory);
const approveUC = new ApproveIndicatorUseCase(
  stateHistory,
  indicators,
  orchestrationEvents,
);
const rejectUC = new RejectIndicatorUseCase(
  stateHistory,
  observations,
  orchestrationEvents,
);
const authUC = new AuthLoginUseCase();
const dashboard = new DashboardQueries();

export const auditRouter = Router();
export const internalRouter = Router();

internalRouter.post('/events', async (req, res, next) => {
  try {
    if (!verifyInternalSecret(req)) {
      res.status(403).json({ error: { code: 'FORBIDDEN', message: 'Invalid secret' } });
      return;
    }
    const envelope = req.body as DomainEventEnvelope<EvidenceUploadedPayload>;
    await handleEvidence.execute(envelope);
    res.status(202).json({ accepted: true });
  } catch (e) {
    next(e);
  }
});

auditRouter.post('/auth/login', async (req, res, next) => {
  try {
    const { email, password } = req.body as { email?: string; password?: string };
    if (!email || !password) {
      res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'email y password requeridos' } });
      return;
    }
    const result = await authUC.execute(email, password);
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
});

auditRouter.post(
  '/indicators/:indicatorId/approve',
  authMiddleware,
  requireRoles('DueaTechnician'),
  idempotencyMiddleware,
  async (req, res, next) => {
    try {
      const result = await approveUC.execute({
        indicatorId: String(req.params.indicatorId),
        userId: req.user!.sub,
        justification: (req.body as { justification?: string }).justification,
        correlationId: (req.headers['x-correlation-id'] as string) || crypto.randomUUID(),
      });
      res.json(result);
    } catch (e) {
      if (e instanceof Error && e.message === 'INDICATOR_NOT_FOUND') {
        next(new AppError(ErrorCodes.INDICATOR_NOT_FOUND, 'Indicator no encontrado', 404));
        return;
      }
      next(e);
    }
  },
);

auditRouter.post(
  '/indicators/:indicatorId/reject',
  authMiddleware,
  requireRoles('DueaTechnician'),
  idempotencyMiddleware,
  async (req, res, next) => {
    try {
      const body = req.body as {
        reason?: string;
        evidenceId?: string;
        linkedObservationId?: string | null;
      };
      const result = await rejectUC.execute({
        indicatorId: String(req.params.indicatorId),
        reason: body.reason ?? '',
        evidenceVersionId: body.evidenceId ?? '',
        linkedObservationId: body.linkedObservationId,
        userId: req.user!.sub,
        correlationId: (req.headers['x-correlation-id'] as string) || crypto.randomUUID(),
      });
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  },
);

auditRouter.get(
  '/indicators/:indicatorId/state-history',
  authMiddleware,
  requireRoles('DueaTechnician', 'DueaAdministrator'),
  async (req, res, next) => {
    try {
      const indicatorId = String(req.params.indicatorId);
      const history = await stateHistory.getHistory(indicatorId);
      const currentState =
        (await stateHistory.getCurrentState(indicatorId)) ?? 'PENDIENTE';
      res.json({
        indicatorId,
        currentState,
        history: history.map((h) => ({
          stateHistoryId: h.stateHistoryId,
          previousState: h.previousState,
          newState: h.newState,
          createdByRole: DB_TO_ROLE[h.createdByRole] ?? h.createdByRole,
          createdAt: h.createdAt.toISOString(),
          correlationId: h.correlationId,
        })),
      });
    } catch (e) {
      next(e);
    }
  },
);

auditRouter.get(
  '/indicators/:indicatorId/observations',
  authMiddleware,
  requireRoles('ProgramCoordinator', 'DueaTechnician', 'DueaAdministrator'),
  async (req, res, next) => {
    try {
      if (
        req.user!.role === 'ProgramCoordinator' &&
        req.user!.programScope &&
        !(await indicators.indicatorBelongsToProgram(
          String(req.params.indicatorId),
          req.user!.programScope,
        ))
      ) {
        next(new AppError(ErrorCodes.FORBIDDEN, 'Sin acceso', 403));
        return;
      }
      const indicatorId = String(req.params.indicatorId);
      const observationsList = await observations.listObservations(indicatorId);
      res.json({
        indicatorId,
        observations: observationsList,
      });
    } catch (e) {
      next(e);
    }
  },
);

auditRouter.get(
  '/dashboard/coordinator',
  authMiddleware,
  requireRoles('ProgramCoordinator'),
  async (req, res, next) => {
    try {
      const programId = req.user!.programScope;
      if (!programId) {
        next(new AppError(ErrorCodes.FORBIDDEN, 'Sin carrera asignada', 403));
        return;
      }
      res.json(await dashboard.coordinatorDashboard(programId));
    } catch (e) {
      next(e);
    }
  },
);

auditRouter.get(
  '/dashboard/technician',
  authMiddleware,
  requireRoles('DueaTechnician'),
  async (req, res, next) => {
    try {
      res.json(
        await dashboard.technicianDashboard({
          programId: req.query.programId as string | undefined,
          phaseId: req.query.phaseId as string | undefined,
          status: req.query.status as string | undefined,
        }),
      );
    } catch (e) {
      next(e);
    }
  },
);
