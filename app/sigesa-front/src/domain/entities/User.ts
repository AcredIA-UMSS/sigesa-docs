/**
 * Roles institucionales SIGESA (ADR_007, glosario §Actores)
 * Mapeo: nombre canónico del glosario → claim JWT del backend cloud
 */
export type SIGESARole =
  | 'ProgramCoordinator'   // [CC] Coordinador de Carrera
  | 'DueaTechnician'       // [TD] Técnico DUEA
  | 'DueaAdministrator'    // [JD] Jefatura DUEA
  | 'Public';              // [P]  Acceso público sin sesión

export const ROLE_LABELS: Record<SIGESARole, string> = {
  ProgramCoordinator: 'Coordinador de Carrera [CC]',
  DueaTechnician: 'Técnico DUEA [TD]',
  DueaAdministrator: 'Jefatura DUEA [JD]',
  Public: 'Público [P]',
};

export interface AuthenticatedUser {
  userId: string;
  email: string;                // debe ser @umss.edu.bo (FSD-BR RB-06)
  role: SIGESARole;
  programScope: string | null;  // UUID de carrera; null para TD/JD/P
  accessToken: string;
  expiresIn: number;
}

export function isCC(user: AuthenticatedUser): boolean {
  return user.role === 'ProgramCoordinator';
}
export function isTD(user: AuthenticatedUser): boolean {
  return user.role === 'DueaTechnician';
}
export function isJD(user: AuthenticatedUser): boolean {
  return user.role === 'DueaAdministrator';
}
