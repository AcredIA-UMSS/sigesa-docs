/**
 * Hook: useApproveIndicator  —  [TD] exclusivo
 * STOP CONDITION: si el usuario activo no es DueaTechnician, se rechaza
 * antes de llamar al backend.
 */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { approveIndicator } from '../services/auditApi';
import { evidenceKeys } from '@/features/evidences/hooks/useEvidence';
import { dashboardKeys } from '@/features/dashboard/hooks/useDashboard';
import { observationKeys } from './useObservation';
import type { ApproveIndicatorPayload, ApproveIndicatorResponse } from '@/domain/entities';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import { ApiError } from '@/lib/httpClient';

export function useApproveIndicator(indicatorId: string) {
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);
  const addNotification = useUIStore((s) => s.addNotification);

  return useMutation<ApproveIndicatorResponse, Error, ApproveIndicatorPayload>({
    mutationFn: (payload) => {
      // STOP CONDITION: solo [TD] puede aprobar (FSD §Actores, ADR_007)
      if (user?.role !== 'DueaTechnician') {
        throw new ApiError(
          'FORBIDDEN_ROLE',
          'Solo el Técnico DUEA [TD] puede aprobar indicadores.',
          403,
        );
      }
      return approveIndicator(indicatorId, payload);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: evidenceKeys.byIndicator(indicatorId) });
      queryClient.invalidateQueries({ queryKey: observationKeys.byIndicator(indicatorId) });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.coordinator });
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'technician'] });
      addNotification({ type: 'success', message: 'Indicador aprobado correctamente.' });
    },

    onError: (err) => {
      addNotification({ type: 'error', message: err.message });
    },
  });
}
