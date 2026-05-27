/**
 * Guardias de rol (RBAC) — centralizadas aquí.
 * Nunca dispersar `if (user.role === 'CC')` en componentes.
 */
import type { SIGESARole } from '@/domain/entities';
import { ROLES } from '@/shared/constants/roles';

export function hasRole(userRole: SIGESARole, required: SIGESARole): boolean {
  return userRole === required;
}

export function canUploadEvidence(role: SIGESARole): boolean {
  return role === ROLES.CC;
}

export function canAuditIndicator(role: SIGESARole): boolean {
  return role === ROLES.TD;
}

export function canViewAdminDashboard(role: SIGESARole): boolean {
  return role === ROLES.JD;
}

export function canViewIndicatorHistory(role: SIGESARole): boolean {
  return role === ROLES.TD || role === ROLES.JD;
}
