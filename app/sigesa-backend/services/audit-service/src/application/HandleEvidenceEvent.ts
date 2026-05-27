import {
  EventTypes,
  ROLE_TO_DB,
  type DomainEventEnvelope,
  type EvidenceUploadedPayload,
} from '@sigesa/shared';
import { transitionForEvidenceUpload } from '../domain/IndicatorStateMachine.js';
import type { StateHistoryRepositoryPort } from '../ports/repositories.js';

export class HandleEvidenceUploadedEvent {
  constructor(private readonly stateHistory: StateHistoryRepositoryPort) {}

  async execute(envelope: DomainEventEnvelope<EvidenceUploadedPayload>): Promise<void> {
    if (
      envelope.type !== EventTypes.EvidenceUploaded &&
      envelope.type !== EventTypes.EvidenceSubsanated
    ) {
      return;
    }

    if (await this.stateHistory.isEventProcessed(envelope.correlationId)) {
      return;
    }

    const { indicatorId, actorId, actorRole } = envelope.payload;
    const isSubsanation = envelope.type === EventTypes.EvidenceSubsanated;

    const current = await this.stateHistory.getCurrentState(indicatorId);
    const { from, to } = transitionForEvidenceUpload(current, isSubsanation);

    const role =
      actorRole in ROLE_TO_DB
        ? ROLE_TO_DB[actorRole as keyof typeof ROLE_TO_DB]
        : 'CC';

    await this.stateHistory.insertTransition({
      indicatorId,
      previousState: from,
      newState: to,
      reason: isSubsanation ? 'Subsanacion de Evidence' : 'Carga inicial de Evidence',
      correlationId: envelope.correlationId,
      userId: actorId,
      role,
    });

    await this.stateHistory.markEventProcessed(envelope.correlationId, envelope.type);
  }
}
