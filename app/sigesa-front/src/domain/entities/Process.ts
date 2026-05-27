/**
 * Entidades estructurales del dominio SIGESA (glosario §1–§5)
 * Jerarquía: Proceso → Fase → Dimensión → Criterio → Indicador
 */

export type ProcessStatus =
  | 'Borrador'
  | 'ACTIVO'       // UI badge: "EN PROCESO"
  | 'Acreditado'
  | 'Rechazado'
  | 'Vencido'
  | 'Anulado';     // soft-close por [JD] (FSD-BR-19)

export type ModalityType = 'CEUB' | 'ARCU-SUR';

export interface Process {
  processId: string;
  programId: string;
  managementYear: number;
  modality: ModalityType;
  status: ProcessStatus;
  createdAt: string;
}

export type PhaseType = 'Autoevaluación' | 'Evaluación Interna' | 'Evaluación Externa';

export interface Phase {
  phaseId: string;
  processId: string;
  type: PhaseType;
  order: 1 | 2 | 3;
  isOpen: boolean;
}

export interface Dimension {
  dimensionId: string;
  phaseId: string;
  name: string;
  order: number;
}

export interface Criterion {
  criterionId: string;
  dimensionId: string;
  name: string;
  order: number;
}

/**
 * Estado del Indicador (máquina de estados §2 — 04_state_machine.md)
 * Transiciones válidas:
 *   PENDIENTE → SUBIDO (CC carga evidencia)
 *   SUBIDO    → APROBADO | OBSERVADO (TD audita)
 *   OBSERVADO → SUBSANADO (CC carga v2 anclada a observación)
 *   SUBSANADO → APROBADO | OBSERVADO (TD reevalúa)
 */
export type IndicatorState =
  | 'PENDIENTE'
  | 'SUBIDO'
  | 'APROBADO'
  | 'OBSERVADO'
  | 'SUBSANADO';

export interface Indicator {
  indicatorId: string;
  criterionId: string;
  code: string;           // ej. "1.2.3"
  description: string;
  currentState: IndicatorState;
  phaseId: string;
}

export interface StateHistoryEntry {
  stateHistoryId: string;
  previousState: IndicatorState | null;
  newState: IndicatorState;
  createdByRole: string;
  createdAt: string;
  correlationId: string;
}
