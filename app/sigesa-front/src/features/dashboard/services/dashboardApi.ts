/**
 * Dashboard Service — cliente REST.
 * Contratos: docs/04_fsd/api_contracts.md §7 (MOD-DASH)
 *   GET /dashboard/coordinator  → [CC]
 *   GET /dashboard/technician   → [TD]
 */
import { apiGet } from '@/lib/httpClient';
import type { Indicator, Phase } from '@/domain/entities';
import type { Observation } from '@/domain/entities';

export interface CoordinatorDashboard {
  programId: string;
  programName: string;
  phases: Phase[];
  indicators: Indicator[];
  openObservations: Observation[];
}

export interface TechnicianDashboard {
  pendingIndicators: Indicator[];
  total: number;
}

export async function getCoordinatorDashboard(): Promise<CoordinatorDashboard> {
  return apiGet<CoordinatorDashboard>('/dashboard/coordinator');
}

export async function getTechnicianDashboard(
  params?: { programId?: string; phaseId?: string; status?: string },
): Promise<TechnicianDashboard> {
  return apiGet<TechnicianDashboard>('/dashboard/technician', { params });
}
