/**
 * Hook: useEvidence
 * Consulta la lista de versiones de Evidence para un Indicator.
 * React Query maneja el refresco automático tras invalidaciones.
 */
import { useQuery } from '@tanstack/react-query';
import { listEvidences } from '../services/evidenceApi';
import type { EvidenceListResponse } from '@/domain/entities';

export const evidenceKeys = {
  all: ['evidences'] as const,
  byIndicator: (indicatorId: string) =>
    [...evidenceKeys.all, indicatorId] as const,
};

export function useEvidence(indicatorId: string) {
  return useQuery<EvidenceListResponse>({
    queryKey: evidenceKeys.byIndicator(indicatorId),
    queryFn: () => listEvidences(indicatorId),
    enabled: Boolean(indicatorId),
    staleTime: 0, // siempre revalidar; las URLs S3 expiran en 15 min
  });
}
