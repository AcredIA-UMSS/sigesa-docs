import type { IndicatorStatus } from '@sigesa/shared';
import { AppError, ErrorCodes } from '@sigesa/shared';

const TRANSITIONS: Record<IndicatorStatus, IndicatorStatus[]> = {
  PENDIENTE: ['SUBIDO'],
  SUBIDO: ['APROBADO', 'OBSERVADO'],
  OBSERVADO: ['SUBSANADO'],
  SUBSANADO: ['APROBADO', 'OBSERVADO'],
  APROBADO: [],
};

export function validateTransition(
  from: IndicatorStatus,
  to: IndicatorStatus,
  attemptedLabel?: string,
): void {
  const allowed = TRANSITIONS[from] ?? [];
  if (!allowed.includes(to)) {
    throw new AppError(
      ErrorCodes.ILLEGAL_STATE_TRANSITION,
      `Transicion no permitida: ${from} -> ${to}`,
      409,
      {
        currentState: from,
        attemptedTransition: attemptedLabel ?? to,
      },
    );
  }
}

export function transitionForEvidenceUpload(
  current: IndicatorStatus | null,
  isSubsanation: boolean,
): { from: IndicatorStatus; to: IndicatorStatus } {
  const from = current ?? 'PENDIENTE';
  if (isSubsanation) {
    validateTransition(from, 'SUBSANADO');
    return { from, to: 'SUBSANADO' };
  }
  validateTransition(from, 'SUBIDO');
  return { from, to: 'SUBIDO' };
}
