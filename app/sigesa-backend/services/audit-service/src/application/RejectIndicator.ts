import { EventTypes, ROLE_TO_DB } from '@sigesa/shared';
import { AppError, ErrorCodes } from '@sigesa/shared';
import { validateTransition } from '../domain/IndicatorStateMachine.js';
import type {
  ObservationRepositoryPort,
  StateHistoryRepositoryPort,
} from '../ports/repositories.js';
import type { EventPublisherPort } from '@sigesa/shared';

export class RejectIndicatorUseCase {
  constructor(
    private readonly stateHistory: StateHistoryRepositoryPort,
    private readonly observations: ObservationRepositoryPort,
    private readonly events: EventPublisherPort,
  ) {}

  async execute(params: {
    indicatorId: string;
    reason: string;
    evidenceVersionId: string;
    linkedObservationId?: string | null;
    userId: string;
    correlationId: string;
  }) {
    if (!params.reason || params.reason.length < 20) {
      throw new AppError(
        ErrorCodes.REASON_REQUIRED,
        'El campo reason es obligatorio (min 20 caracteres)',
        400,
        { minLength: 20 },
      );
    }

    const current = await this.stateHistory.getCurrentState(params.indicatorId);
    if (!current) {
      throw new AppError(ErrorCodes.INDICATOR_NOT_FOUND, 'Indicator no encontrado', 404);
    }
    validateTransition(current, 'OBSERVADO');

    const obsCount = await this.observations.getObservationCount(params.indicatorId);
    const observationId = await this.observations.insertObservation({
      indicatorId: params.indicatorId,
      justification: params.reason,
      userId: params.userId,
      version: obsCount + 1,
      supersedesId: params.linkedObservationId ?? null,
    });

    await this.observations.linkEvidenceVersionToObservation(
      params.evidenceVersionId,
      observationId,
    );

    const stateHistoryId = await this.stateHistory.insertTransition({
      indicatorId: params.indicatorId,
      previousState: current,
      newState: 'OBSERVADO',
      reason: params.reason,
      correlationId: params.correlationId,
      userId: params.userId,
      role: ROLE_TO_DB.DueaTechnician,
    });

    await this.events.publish({
      type: EventTypes.IndicatorObserved,
      version: 1,
      timestamp: new Date().toISOString(),
      correlationId: params.correlationId,
      payload: {
        indicatorId: params.indicatorId,
        observationId,
        evidenceVersionId: params.evidenceVersionId,
      },
    });

    return {
      observationId,
      indicatorId: params.indicatorId,
      newState: 'OBSERVADO' as const,
      stateHistoryId,
    };
  }
}
