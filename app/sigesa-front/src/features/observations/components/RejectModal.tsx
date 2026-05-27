'use client';

/**
 * RejectModal — [TD] rechaza un Indicator y emite una Observation.
 * Valida reason ≥ 20 caracteres antes de enviar.
 * STOP CONDITION: si el usuario no es DueaTechnician, el hook lo bloquea.
 */
import { useState } from 'react';
import { useRejectIndicator } from '../hooks/useRejectIndicator';
import { Button } from '@/shared/ui/Button';

interface RejectModalProps {
  indicatorId: string;
  evidenceId: string;
  onClose: () => void;
}

const MIN_REASON = 20;

export function RejectModal({ indicatorId, evidenceId, onClose }: RejectModalProps) {
  const [reason, setReason] = useState('');
  const { mutate, isPending } = useRejectIndicator(indicatorId);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutate({ reason, evidenceId }, { onSuccess: onClose });
  }

  const isValid = reason.trim().length >= MIN_REASON;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Emitir Observación
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Motivo del rechazo{' '}
              <span className="text-gray-400">(mín. {MIN_REASON} caracteres)</span>
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
              maxLength={1000}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:outline-none"
              placeholder="Describa el defecto normativo detectado en la evidencia..."
            />
            <p className={`mt-1 text-xs ${isValid ? 'text-gray-400' : 'text-red-500'}`}>
              {reason.trim().length} / 1000
            </p>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="danger"
              disabled={!isValid}
              loading={isPending}
            >
              Rechazar y Crear Observación
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
