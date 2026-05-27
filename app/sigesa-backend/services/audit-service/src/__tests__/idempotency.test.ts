/**
 * E2E-style contract tests (no DB): error shape and state machine integration.
 * Full HTTP E2E requires docker postgres + seed (manual / CI).
 */
import { AppError, ErrorCodes } from '../../../../shared/src/errors.js';

describe('API error contract', () => {
  it('serializes cloud error shape', () => {
    const err = new AppError(
      ErrorCodes.EVIDENCE_UPLOAD_NOT_ALLOWED,
      'no permitido',
      409,
      { currentState: 'APROBADO' },
    );
    expect(err.toJSON()).toEqual({
      error: {
        code: 'EVIDENCE_UPLOAD_NOT_ALLOWED',
        message: 'no permitido',
        currentState: 'APROBADO',
      },
    });
  });
});
