'use client';

/**
 * CoordinatorHome — dashboard principal del Coordinador de Carrera [CC].
 * Corresponde al frame Figma: cc-coordinador-home (P0, Node 635:319).
 * Flujo:
 *   1. Lista indicadores del proceso activo con su estado actual.
 *   2. Permite subir evidencia (PENDIENTE) o subsanar (OBSERVADO).
 *   3. No permite ninguna acción destructiva.
 *   4. Refetch automático cada 30s para reflejar eventos del backend.
 */
import { useState } from 'react';
import { useCoordinatorDashboard } from '../hooks/useDashboard';
import { EvidenceUploader } from '@/features/evidences/components/EvidenceUploader';
import { EvidenceList } from '@/features/evidences/components/EvidenceList';
import { ObservationList } from '@/features/observations/components/ObservationList';
import { StateBadge } from '@/shared/ui/StateBadge';
import { Spinner } from '@/shared/ui/Spinner';
import { useUIStore } from '@/store/uiStore';

export function CoordinatorHome() {
  const { data, isLoading, isError } = useCoordinatorDashboard();
  const { uploadModalOpen, uploadModalIndicatorId, uploadModalObservationId,
          openUploadModal, closeUploadModal } = useUIStore();

  const [expandedIndicator, setExpandedIndicator] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-md bg-red-50 p-6 text-center text-sm text-red-700">
        Error al cargar el dashboard. Recarga la página.
      </div>
    );
  }

  const indicators = data?.indicators ?? [];
  const openObservations = data?.openObservations ?? [];

  const observedCount = indicators.filter((i) => i.currentState === 'OBSERVADO').length;
  const approvedCount = indicators.filter((i) => i.currentState === 'APROBADO').length;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Panel del Coordinador
        </h1>
        <p className="text-sm text-gray-500">
          {data?.programName} · Proceso activo
        </p>
      </div>

      {/* Resumen KPIs */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-lg border bg-white p-4">
          <p className="text-xs text-gray-500">Total indicadores</p>
          <p className="text-2xl font-bold text-gray-900">{indicators.length}</p>
        </div>
        <div className="rounded-lg border bg-red-50 p-4">
          <p className="text-xs text-red-600">Observados</p>
          <p className="text-2xl font-bold text-red-700">{observedCount}</p>
        </div>
        <div className="rounded-lg border bg-green-50 p-4">
          <p className="text-xs text-green-600">Aprobados</p>
          <p className="text-2xl font-bold text-green-700">{approvedCount}</p>
        </div>
      </div>

      {/* Observaciones abiertas globales */}
      {openObservations.length > 0 && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          ⚠️ Tienes <strong>{openObservations.length}</strong> observación(es) que bloquean el cierre de Fase.
        </div>
      )}

      {/* Lista de indicadores */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
          Indicadores
        </h2>
        {indicators.map((indicator) => (
          <div
            key={indicator.indicatorId}
            className="rounded-lg border bg-white shadow-sm"
          >
            <button
              className="flex w-full items-center justify-between p-4 text-left"
              onClick={() =>
                setExpandedIndicator(
                  expandedIndicator === indicator.indicatorId
                    ? null
                    : indicator.indicatorId,
                )
              }
            >
              <div>
                <span className="font-mono text-xs text-gray-400">
                  {indicator.code}
                </span>
                <p className="text-sm font-medium text-gray-900">
                  {indicator.description}
                </p>
              </div>
              <StateBadge state={indicator.currentState} />
            </button>

            {expandedIndicator === indicator.indicatorId && (
              <div className="border-t p-4 space-y-4">
                {/* Observaciones pendientes */}
                <ObservationList
                  indicatorId={indicator.indicatorId}
                  onSubsanar={(obsId) =>
                    openUploadModal(indicator.indicatorId, obsId)
                  }
                />

                {/* Listado de versiones */}
                <EvidenceList
                  indicatorId={indicator.indicatorId}
                  indicatorState={indicator.currentState}
                  onUpload={() => openUploadModal(indicator.indicatorId)}
                  onSubsanar={(obsId) =>
                    openUploadModal(indicator.indicatorId, obsId)
                  }
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal de carga */}
      {uploadModalOpen && uploadModalIndicatorId && (
        <EvidenceUploader
          indicatorId={uploadModalIndicatorId}
          observationId={uploadModalObservationId ?? undefined}
          onClose={closeUploadModal}
        />
      )}
    </div>
  );
}
