import { EventTypes, ROLE_TO_DB } from '@sigesa/shared';
import type { DomainEventEnvelope, EventPublisherPort } from '@sigesa/shared';
import { validateTransition } from '../domain/IndicatorStateMachine.js';
import type {
  IndicatorQueryPort,
  StateHistoryRepositoryPort,
} from '../ports/repositories.js';

export class ApproveIndicatorUseCase {
  constructor(
    private readonly stateHistory: StateHistoryRepositoryPort,
    private readonly indicators: IndicatorQueryPort,
    private readonly events: EventPublisherPort,
  ) {}

  async execute(params: {
    indicatorId: string;
    userId: string;
    justification?: string;
    correlationId: string;
  }) {
    const current = await this.stateHistory.getCurrentState(params.indicatorId);
    if (!current) {
      throw new Error('INDICATOR_NOT_FOUND');
    }
    validateTransition(current, 'APROBADO', 'APROBADO');

    const stateHistoryId = await this.stateHistory.insertTransition({
      indicatorId: params.indicatorId,
      previousState: current,
      newState: 'APROBADO',
      reason: params.justification ?? null,
      correlationId: params.correlationId,
      userId: params.userId,
      role: ROLE_TO_DB.DueaTechnician,
    });

    const phaseId = await this.indicators.getPhaseId(params.indicatorId);

    const envelope: DomainEventEnvelope = {
      type: EventTypes.IndicatorApproved,
      version: 1,
      timestamp: new Date().toISOString(),
      correlationId: params.correlationId,
      payload: {
        indicatorId: params.indicatorId,
        phaseId: phaseId ?? '',
        actorId: params.userId,
      },
    };

    await this.events.publish(envelope);

    return {
      indicatorId: params.indicatorId,
      previousState: current,
      newState: 'APROBADO' as const,
      stateHistoryId,
    };
  }
}
