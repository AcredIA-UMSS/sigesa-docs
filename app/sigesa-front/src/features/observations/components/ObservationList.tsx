'use client';

/**
 * ObservationList — lista las Observations abiertas de un Indicator (lectura CC).
 * Una Observation abierta bloquea el cierre de Fase (FSD-BR-07).
 */
import { useObservation } from '../hooks/useObservation';
import { Spinner } from '@/shared/ui/Spinner';
import { Button } from '@/shared/ui/Button';

interface ObservationListProps {
  indicatorId: string;
  /** Si se provee, el CC puede lanzar el modal de subsanación. */
  onSubsanar?: (observationId: string) => void;
}

export function ObservationList({ indicatorId, onSubsanar }: ObservationListProps) {
  const { data, isLoading, isError, refetch } = useObservation(indicatorId);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 py-2 text-sm text-gray-500">
        <Spinner size="sm" /> Verificando observaciones...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
        Error al cargar observaciones.{' '}
        <button className="underline" onClick={() => refetch()}>
          Reintentar
        </button>
      </div>
    );
  }

  const observations = data?.observations ?? [];

  if (observations.length === 0) return null;

  return (
    <div className="space-y-3 rounded-md border border-red-200 bg-red-50 p-4">
      <h4 className="text-sm font-semibold text-red-800">
        Observaciones abiertas ({observations.length})
      </h4>
      <ul className="space-y-2">
        {observations.map((obs) => (
          <li
            key={obs.observationId}
            className="rounded-md bg-white p-3 text-sm shadow-sm"
          >
            <p className="text-gray-800">{obs.reason}</p>
            <p className="mt-1 text-xs text-gray-400">
              {new Date(obs.createdAt).toLocaleString('es-BO')} ·{' '}
              <span className="font-medium">{obs.createdByRole}</span>
            </p>
            {onSubsanar && (
              <Button
                variant="secondary"
                className="mt-2 text-xs"
                onClick={() => onSubsanar(obs.observationId)}
              >
                Subsanar esta observación
              </Button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
