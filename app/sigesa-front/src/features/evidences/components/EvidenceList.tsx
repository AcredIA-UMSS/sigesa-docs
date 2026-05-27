'use client';

/**
 * EvidenceList — tabla de versiones de Evidence para un Indicator.
 * Las URLs S3 son pre-firmadas y expiran en 15 min.
 * No se cachean; se solicitan frescas en cada sesión.
 */
import { useEvidence } from '../hooks/useEvidence';
import { StateBadge } from '@/shared/ui/StateBadge';
import { Spinner } from '@/shared/ui/Spinner';
import type { IndicatorState } from '@/domain/entities';

interface EvidenceListProps {
  indicatorId: string;
  indicatorState: IndicatorState;
  onUpload?: () => void;
  onSubsanar?: (observationId: string) => void;
}

export function EvidenceList({
  indicatorId,
  indicatorState,
  onUpload,
  onSubsanar,
}: EvidenceListProps) {
  const { data, isLoading, isError, refetch } = useEvidence(indicatorId);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 py-4 text-sm text-gray-500">
        <Spinner size="sm" /> Cargando evidencias...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
        Error al cargar evidencias.{' '}
        <button className="underline" onClick={() => refetch()}>
          Reintentar
        </button>
      </div>
    );
  }

  const evidences = data?.evidences ?? [];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium text-gray-900">Evidencias</h3>
          <StateBadge state={indicatorState} />
        </div>
        {indicatorState === 'PENDIENTE' && onUpload && (
          <button
            onClick={onUpload}
            className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700"
          >
            + Subir Evidencia
          </button>
        )}
      </div>

      {evidences.length === 0 ? (
        <p className="text-sm text-gray-400">Sin evidencias registradas.</p>
      ) : (
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs font-medium text-gray-500">
            <tr>
              <th className="px-3 py-2 text-left">Versión</th>
              <th className="px-3 py-2 text-left">Fecha</th>
              <th className="px-3 py-2 text-left">SHA-256</th>
              <th className="px-3 py-2 text-left">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {evidences.map((ev) => (
              <tr key={ev.evidenceId}>
                <td className="px-3 py-2 font-mono">v{ev.version}</td>
                <td className="px-3 py-2 text-gray-600">
                  {new Date(ev.createdAt).toLocaleDateString('es-BO')}
                </td>
                <td className="px-3 py-2 font-mono text-xs text-gray-400">
                  {ev.contentSha256.substring(0, 12)}…
                </td>
                <td className="px-3 py-2">
                  {/* URL fresca del backend — nunca caché local */}
                  <a
                    href={ev.s3PresignedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Descargar
                  </a>
                  {indicatorState === 'OBSERVADO' && ev.observationId && onSubsanar && (
                    <button
                      onClick={() => onSubsanar(ev.observationId!)}
                      className="ml-3 text-yellow-700 underline"
                    >
                      Subsanar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
