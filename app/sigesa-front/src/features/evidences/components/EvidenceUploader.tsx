'use client';

/**
 * EvidenceUploader — Modal de carga de Evidence (Rol CC).
 * Directivas:
 *  - Valida archivo ≤ 50 MB antes del POST (front_generator §Reglas Duras).
 *  - No asume cambio de estado tras envío (UX Event-Driven).
 *  - Muestra "Procesando..." hasta confirmación del backend.
 *  - observationId obligatorio si modo subsanación.
 */
import { useRef, useState } from 'react';
import { useEvidenceUpload } from '../hooks/useEvidenceUpload';
import { Button } from '@/shared/ui/Button';
import { MAX_FILE_SIZE } from '@/lib/httpClient';

interface EvidenceUploaderProps {
  indicatorId: string;
  /** Si se provee, este upload es una subsanación anclada a la Observation. */
  observationId?: string;
  onClose: () => void;
}

export function EvidenceUploader({
  indicatorId,
  observationId,
  onClose,
}: EvidenceUploaderProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [note, setNote] = useState('');
  const [fileError, setFileError] = useState<string | null>(null);

  const { mutate, isPending, isSuccess } = useEvidenceUpload();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFileError(null);

    const file = fileRef.current?.files?.[0];
    if (!file) {
      setFileError('Selecciona un archivo PDF o DOCX.');
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setFileError(`El archivo supera el límite de 50 MB (${(file.size / 1024 / 1024).toFixed(1)} MB).`);
      return;
    }

    mutate(
      { indicatorId, evidenceBlob: file, observationId: observationId ?? null, note },
      { onSuccess: onClose },
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
        <h2 className="mb-1 text-lg font-semibold text-gray-900">
          {observationId ? 'Subsanar Evidencia' : 'Subir Evidencia'}
        </h2>

        {observationId && (
          <p className="mb-4 rounded-md bg-yellow-50 p-3 text-sm text-yellow-800">
            Esta carga subsana la observación <code className="font-mono text-xs">{observationId}</code>.
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Archivo (PDF / DOCX — máx. 50 MB)
            </label>
            <input
              ref={fileRef}
              type="file"
              accept=".pdf,.docx"
              className="mt-1 block w-full rounded-md border border-gray-300 text-sm text-gray-700 file:mr-3 file:rounded file:border-0 file:bg-blue-50 file:px-3 file:py-1.5 file:text-sm file:text-blue-700"
            />
            {fileError && (
              <p className="mt-1 text-xs text-red-600">{fileError}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nota descriptiva (opcional)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              maxLength={500}
              rows={3}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              placeholder="Descripción breve del documento..."
            />
          </div>

          {isSuccess && (
            <p className="rounded-md bg-blue-50 p-3 text-sm text-blue-700">
              Evidencia enviada. Estado <strong>pendiente de confirmación del servidor</strong>.
            </p>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" loading={isPending}>
              {observationId ? 'Enviar Subsanación' : 'Subir Evidencia'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
