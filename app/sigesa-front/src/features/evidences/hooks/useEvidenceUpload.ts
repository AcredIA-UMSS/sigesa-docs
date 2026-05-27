/**
 * Hook: useEvidenceUpload
 * Sube una Evidence (carga inicial o subsanación).
 * UX Event-Driven:
 *   1. El POST retorna inmediatamente con evidenceId (backend queued).
 *   2. El estado del Indicator NO se asume actualizado; el Audit Service
 *      lo actualizará al consumir el evento EvidenceUploaded (ADR_010 Regla 2).
 *   3. Se invalida la query de evidencias para refrescar la lista.
 *   4. El componente debe mostrar "Procesando..." hasta que el estado
 *      del Indicator sea confirmado por el backend.
 */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadEvidence } from '../services/evidenceApi';
import { evidenceKeys } from './useEvidence';
import { dashboardKeys } from '@/features/dashboard/hooks/useDashboard';
import { observationKeys } from '@/features/observations/hooks/useObservation';
import type { EvidenceUploadPayload, EvidenceUploadResponse } from '@/domain/entities';
import { useUIStore } from '@/store/uiStore';

export function useEvidenceUpload() {
  const queryClient = useQueryClient();
  const addNotification = useUIStore((s) => s.addNotification);

  return useMutation<EvidenceUploadResponse, Error, EvidenceUploadPayload>({
    mutationFn: uploadEvidence,

    onSuccess: (data, variables) => {
      // Refrescar lista de evidencias del Indicator
      queryClient.invalidateQueries({
        queryKey: evidenceKeys.byIndicator(variables.indicatorId),
      });
      // Refrescar observaciones para actualizar estado de UI
      queryClient.invalidateQueries({
        queryKey: observationKeys.byIndicator(variables.indicatorId),
      });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.coordinator });
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'technician'] });
      addNotification({
        type: 'info',
        message:
          'Evidencia enviada. Estado pendiente de confirmación del servidor.',
      });
    },

    onError: (err) => {
      addNotification({ type: 'error', message: err.message });
    },
  });
}
