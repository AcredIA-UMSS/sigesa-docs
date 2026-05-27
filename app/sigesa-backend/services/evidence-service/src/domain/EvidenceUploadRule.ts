import type { IndicatorStatus } from '@sigesa/shared';
import { AppError, ErrorCodes } from '@sigesa/shared';

const ALLOWED_UPLOAD_STATES: IndicatorStatus[] = ['PENDIENTE', 'OBSERVADO'];

export function assertUploadAllowed(
  currentState: IndicatorStatus | null,
  observationId: string | null | undefined,
): void {
  const state = currentState ?? 'PENDIENTE';
  if (!ALLOWED_UPLOAD_STATES.includes(state)) {
    throw new AppError(
      ErrorCodes.EVIDENCE_UPLOAD_NOT_ALLOWED,
      `El Indicator no esta en estado PENDIENTE ni OBSERVADO.`,
      409,
      { currentState: state },
    );
  }
  if (state === 'OBSERVADO' && !observationId) {
    throw new AppError(
      ErrorCodes.OBSERVATION_ID_REQUIRED,
      'observationId es obligatorio cuando el Indicator esta OBSERVADO',
      400,
      { currentState: state },
    );
  }
}
