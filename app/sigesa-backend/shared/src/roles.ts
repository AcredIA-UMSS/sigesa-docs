export type JwtRole =
  | 'ProgramCoordinator'
  | 'DueaTechnician'
  | 'DueaAdministrator';

export type ActorRoleDb = 'CC' | 'TD' | 'JD' | 'SYSTEM';

export const ROLE_TO_DB: Record<JwtRole, ActorRoleDb> = {
  ProgramCoordinator: 'CC',
  DueaTechnician: 'TD',
  DueaAdministrator: 'JD',
};

export const DB_TO_ROLE: Record<ActorRoleDb, JwtRole | null> = {
  CC: 'ProgramCoordinator',
  TD: 'DueaTechnician',
  JD: 'DueaAdministrator',
  SYSTEM: null,
};

export type IndicatorStatus =
  | 'PENDIENTE'
  | 'SUBIDO'
  | 'OBSERVADO'
  | 'SUBSANADO'
  | 'APROBADO';
