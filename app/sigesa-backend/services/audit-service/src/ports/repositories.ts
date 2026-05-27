import type { ActorRoleDb, IndicatorStatus } from '@sigesa/shared';

export interface StateHistoryRow {
  stateHistoryId: string;
  previousState: IndicatorStatus;
  newState: IndicatorStatus;
  createdByRole: ActorRoleDb;
  createdAt: Date;
  correlationId: string;
}

export interface StateHistoryRepositoryPort {
  insertTransition(params: {
    indicatorId: string;
    previousState: IndicatorStatus;
    newState: IndicatorStatus;
    reason: string | null;
    correlationId: string;
    userId: string;
    role: ActorRoleDb;
  }): Promise<string>;
  getHistory(indicatorId: string): Promise<StateHistoryRow[]>;
  getCurrentState(indicatorId: string): Promise<IndicatorStatus | null>;
  isEventProcessed(correlationId: string): Promise<boolean>;
  markEventProcessed(correlationId: string, eventType: string): Promise<void>;
}

export interface ObservationRepositoryPort {
  insertObservation(params: {
    indicatorId: string;
    justification: string;
    userId: string;
    version: number;
    supersedesId: string | null;
  }): Promise<string>;
  listObservations(indicatorId: string): Promise<
    Array<{
      observationId: string;
      evidenceId: string | null;
      reason: string;
      linkedObservationId: string | null;
      createdByRole: string;
      createdAt: string;
    }>
  >;
  linkEvidenceVersionToObservation(
    evidenceVersionId: string,
    observationId: string,
  ): Promise<void>;
  getObservationCount(indicatorId: string): Promise<number>;
}

export interface IndicatorQueryPort {
  getPhaseId(indicatorId: string): Promise<string | null>;
  countByPhaseAndState(phaseId: string): Promise<{ approved: number; total: number }>;
  indicatorBelongsToProgram(indicatorId: string, programId: string): Promise<boolean>;
  getProgramForIndicator(indicatorId: string): Promise<{
    programId: string;
    programName: string;
    phaseId: string;
  } | null>;
}
