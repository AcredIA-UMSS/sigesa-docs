/**
 * Hook: useObservation
 * Lista las Observations de un Indicator (CC solo su carrera, TD global).
 */
import { useQuery } from '@tanstack/react-query';
import { listObservations } from '../services/auditApi';
import type { ObservationListResponse } from '@/domain/entities';

export const observationKeys = {
  all: ['observations'] as const,
  byIndicator: (indicatorId: string) =>
    [...observationKeys.all, indicatorId] as const,
};

export function useObservation(indicatorId: string) {
  return useQuery<ObservationListResponse>({
    queryKey: observationKeys.byIndicator(indicatorId),
    queryFn: () => listObservations(indicatorId),
    enabled: Boolean(indicatorId),
    refetchInterval: 30_000, // polling 30s como sustituto de WS en MVP
  });
}
