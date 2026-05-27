export const EventTypes = {
  EvidenceUploaded: 'EvidenceUploaded',
  EvidenceSubsanated: 'EvidenceSubsanated',
  IndicatorApproved: 'IndicatorApproved',
  IndicatorObserved: 'IndicatorObserved',
  PhaseCompleted: 'PhaseCompleted',
} as const;

export type EventType = (typeof EventTypes)[keyof typeof EventTypes];

export interface DomainEventEnvelope<T = Record<string, unknown>> {
  type: EventType | string;
  version: number;
  timestamp: string;
  correlationId: string;
  payload: T;
}

export interface EvidenceUploadedPayload {
  indicatorId: string;
  evidenceVersionId: string;
  evidenceId: string;
  version: number;
  actorId: string;
  actorRole: string;
  observationId?: string | null;
}

export interface IndicatorApprovedPayload {
  indicatorId: string;
  phaseId: string;
  actorId: string;
}
