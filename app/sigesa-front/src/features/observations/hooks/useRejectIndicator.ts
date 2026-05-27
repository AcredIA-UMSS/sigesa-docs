/**
 * Hook: useRejectIndicator  —  [TD] exclusivo
 * Rechaza un Indicator y crea una Observation.
 * STOP CONDITION: si el usuario activo no es DueaTechnician, se rechaza.
 */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { rejectIndicator } from '../services/auditApi';
import { evidenceKeys } from '@/features/evidences/hooks/useEvidence';
import { dashboardKeys } from '@/features/dashboard/hooks/useDashboard';
import { observationKeys } from './useObservation';
import type { RejectIndicatorPayload, RejectIndicatorResponse } from '@/domain/entities';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import { ApiError } from '@/lib/httpClient';

const MIN_REASON_LENGTH = 20;

export function useRejectIndicator(indicatorId: string) {
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);
  const addNotification = useUIStore((s) => s.addNotification);

  return useMutation<RejectIndicatorResponse, Error, RejectIndicatorPayload>({
    mutationFn: (payload) => {
      if (user?.role !== 'DueaTechnician') {
        throw new ApiError(
          'FORBIDDEN_ROLE',
          'Solo el Técnico DUEA [TD] puede emitir observaciones.',
          403,
        );
      }
      if (payload.reason.trim().length < MIN_REASON_LENGTH) {
        throw new ApiError(
          'REASON_REQUIRED',
          `La justificación debe tener al menos ${MIN_REASON_LENGTH} caracteres.`,
          400,
        );
      }
      return rejectIndicator(indicatorId, payload);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: evidenceKeys.byIndicator(indicatorId) });
      queryClient.invalidateQueries({ queryKey: observationKeys.byIndicator(indicatorId) });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.coordinator });
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'technician'] });
      addNotification({ type: 'warning', message: 'Observación registrada. El Coordinador será notificado.' });
    },

    onError: (err) => {
      addNotification({ type: 'error', message: err.message });
    },
  });
}
