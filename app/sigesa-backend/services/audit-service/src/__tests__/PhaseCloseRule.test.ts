import { canClosePhase } from '../domain/PhaseCloseRule.js';

describe('PhaseCloseRule', () => {
  it('closes when all approved', () => {
    expect(canClosePhase({ approved: 3, total: 3 })).toBe(true);
  });

  it('does not close when pending', () => {
    expect(canClosePhase({ approved: 2, total: 3 })).toBe(false);
  });
});
