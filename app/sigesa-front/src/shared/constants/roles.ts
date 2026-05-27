import type { SIGESARole } from '@/domain/entities';

export const ROLES = {
  CC: 'ProgramCoordinator' as SIGESARole,
  TD: 'DueaTechnician' as SIGESARole,
  JD: 'DueaAdministrator' as SIGESARole,
  P: 'Public' as SIGESARole,
} as const;
