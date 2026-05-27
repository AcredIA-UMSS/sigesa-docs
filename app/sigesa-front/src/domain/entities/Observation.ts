/**
 * Observación — registro formal de no-conformidad emitido por [TD] (glosario §8)
 * Una Observation abierta bloquea el cierre de Fase (FSD-BR-07).
 * Append-Only: nunca se borra, solo se resuelve mediante subsanación.
 */
export interface Observation {
  observationId: string;
  indicatorId: string;
  evidenceId: string;
  reason: string;                        // min 20, max 1000 chars
  linkedObservationId: string | null;    // iteración de subsanación
  createdByRole: string;
  createdAt: string;
}

export interface ObservationListResponse {
  indicatorId: string;
  observations: Observation[];
}

export interface RejectIndicatorPayload {
  reason: string;          // min 20 chars
  evidenceId: string;
  linkedObservationId?: string;
}

export interface RejectIndicatorResponse {
  observationId: string;
  indicatorId: string;
  newState: 'OBSERVADO';
  stateHistoryId: string;
}

export interface ApproveIndicatorPayload {
  justification?: string;
}

export interface ApproveIndicatorResponse {
  indicatorId: string;
  previousState: 'SUBIDO' | 'SUBSANADO';
  newState: 'APROBADO';
  stateHistoryId: string;
}
