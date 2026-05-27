import { validateTransition, transitionForEvidenceUpload } from '../domain/IndicatorStateMachine.js';
import { AppError } from '@sigesa/shared';

describe('IndicatorStateMachine', () => {
  it('allows PENDIENTE -> SUBIDO on upload', () => {
    const t = transitionForEvidenceUpload('PENDIENTE', false);
    expect(t.to).toBe('SUBIDO');
  });

  it('allows OBSERVADO -> SUBSANADO on subsanation', () => {
    const t = transitionForEvidenceUpload('OBSERVADO', true);
    expect(t.to).toBe('SUBSANADO');
  });

  it('rejects PENDIENTE -> APROBADO', () => {
    expect(() => validateTransition('PENDIENTE', 'APROBADO')).toThrow(AppError);
  });

  it('allows SUBIDO -> APROBADO for TD approve', () => {
    expect(() => validateTransition('SUBIDO', 'APROBADO')).not.toThrow();
  });
});
