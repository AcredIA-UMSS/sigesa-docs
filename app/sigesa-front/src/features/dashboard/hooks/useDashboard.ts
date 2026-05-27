/**
 * Hooks de Dashboard: CC y TD.
 * Polling 30s para reflejar cambios de estado producidos por eventos
 * del backend (ADR_010) sin necesidad de WebSocket en MVP v1.0.
 */
import { useQuery } from '@tanstack/react-query';
import {
  getCoordinatorDashboard,
  getTechnicianDashboard,
  type CoordinatorDashboard,
  type TechnicianDashboard,
} from '../services/dashboardApi';

export const dashboardKeys = {
  coordinator: ['dashboard', 'coordinator'] as const,
  technician: (params?: object) => ['dashboard', 'technician', params] as const,
};

export function useCoordinatorDashboard() {
  return useQuery<CoordinatorDashboard>({
    queryKey: dashboardKeys.coordinator,
    queryFn: getCoordinatorDashboard,
    refetchInterval: 30_000,
  });
}

export function useTechnicianDashboard(params?: {
  programId?: string;
  phaseId?: string;
  status?: string;
}) {
  return useQuery<TechnicianDashboard>({
    queryKey: dashboardKeys.technician(params),
    queryFn: () => getTechnicianDashboard(params),
    refetchInterval: 30_000,
  });
}
