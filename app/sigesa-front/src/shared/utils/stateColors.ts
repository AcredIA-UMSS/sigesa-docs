import type { IndicatorState } from '@/domain/entities';

export const STATE_BADGE: Record<IndicatorState, { label: string; className: string }> = {
  PENDIENTE: {
    label: 'Pendiente',
    className: 'bg-gray-100 text-gray-700 border-gray-300',
  },
  SUBIDO: {
    label: 'Subido',
    className: 'bg-blue-100 text-blue-700 border-blue-300',
  },
  OBSERVADO: {
    label: 'Observado',
    className: 'bg-red-100 text-red-700 border-red-300',
  },
  SUBSANADO: {
    label: 'Subsanado',
    className: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  },
  APROBADO: {
    label: 'Aprobado',
    className: 'bg-green-100 text-green-700 border-green-300',
  },
};
