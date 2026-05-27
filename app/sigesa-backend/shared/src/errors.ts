/** Códigos canónicos — api_contracts_cloud.md §4 */
export const ErrorCodes = {
  EVIDENCE_UPLOAD_NOT_ALLOWED: 'EVIDENCE_UPLOAD_NOT_ALLOWED',
  OBSERVATION_ID_REQUIRED: 'OBSERVATION_ID_REQUIRED',
  ILLEGAL_STATE_TRANSITION: 'ILLEGAL_STATE_TRANSITION',
  EVIDENCE_IMMUTABLE: 'EVIDENCE_IMMUTABLE',
  EVIDENCE_NOT_FOUND: 'EVIDENCE_NOT_FOUND',
  REASON_REQUIRED: 'REASON_REQUIRED',
  EVIDENCE_TOO_LARGE: 'EVIDENCE_TOO_LARGE',
  PHASE_NOT_CLOSEABLE: 'PHASE_NOT_CLOSEABLE',
  AUTH_INVALID_CREDENTIALS: 'AUTH_INVALID_CREDENTIALS',
  INDICATOR_NOT_FOUND: 'INDICATOR_NOT_FOUND',
  FORBIDDEN: 'FORBIDDEN',
  UNAUTHORIZED: 'UNAUTHORIZED',
} as const;

export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes];

export interface ApiErrorBody {
  error: {
    code: string;
    message: string;
    [key: string]: unknown;
  };
}

export class AppError extends Error {
  constructor(
    public readonly code: ErrorCode | string,
    message: string,
    public readonly status: number,
    public readonly details?: Record<string, unknown>,
  ) {
    super(message);
    this.name = 'AppError';
  }

  toJSON(): ApiErrorBody {
    return {
      error: {
        code: this.code,
        message: this.message,
        ...this.details,
      },
    };
  }
}

export function isAppError(err: unknown): err is AppError {
  return err instanceof AppError;
}
