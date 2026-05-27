'use client';

/**
 * TechnicianDashboard — Bandeja de tareas del Técnico DUEA [TD].
 * Corresponde al frame Figma: td-bandeja-tareas (P0, Node 1249:3112).
 * Muestra todos los Indicators en estado SUBIDO o SUBSANADO pendientes de revisión.
 * Polling 30s (ADR_010 — Event-Driven, sin WebSocket en MVP).
 */
import { useTechnicianDashboard } from '../hooks/useDashboard';
import { IndicatorReviewCard } from './IndicatorReviewCard';
import { Spinner } from '@/shared/ui/Spinner';

export function TechnicianDashboard() {
  const { data, isLoading, isError } = useTechnicianDashboard({
    status: 'SUBIDO,SUBSANADO',
  });

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
        Error al cargar la bandeja. Recarga la página.
      </div>
    );
  }

  const indicators = data?.pendingIndicators ?? [];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Bandeja de Tareas</h1>
        <p className="text-sm text-gray-500">
          Indicadores pendientes de revisión — Técnico DUEA
        </p>
      </div>

      {/* KPI */}
      <div className="rounded-lg border bg-blue-50 p-4">
        <p className="text-xs text-blue-600">Pendientes de auditoría</p>
        <p className="text-3xl font-bold text-blue-700">{indicators.length}</p>
      </div>

      {indicators.length === 0 ? (
        <div className="rounded-md bg-green-50 p-6 text-center text-sm text-green-700">
          ✅ No hay indicadores pendientes de revisión.
        </div>
      ) : (
        <div className="space-y-3">
          {indicators.map((indicator) => (
            <IndicatorReviewCard
              key={indicator.indicatorId}
              indicator={indicator}
            />
          ))}
        </div>
      )}
    </div>
  );
}
