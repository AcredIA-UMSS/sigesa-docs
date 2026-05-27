/**
 * Evidence Service — cliente REST.
 * Contrato canónico: docs/05_dti/api_contracts_cloud.md §2
 * Endpoints:
 *   POST /indicators/{indicatorId}/evidences       (CC — carga inicial o subsanación)
 *   GET  /indicators/{indicatorId}/evidences        (CC, TD, JD)
 *   GET  /indicators/{indicatorId}/evidences/{id}   (CC, TD, JD)
 */
import {
  apiGet,
  apiPostFormData,
} from '@/lib/httpClient';
import type {
  EvidenceListResponse,
  EvidenceUploadPayload,
  EvidenceUploadResponse,
  Evidence,
} from '@/domain/entities';

/** Sube una Evidence (carga inicial o subsanación).
 *  Si indicatorState == OBSERVADO, observationId es obligatorio (validado en backend).
 */
export async function uploadEvidence(
  payload: EvidenceUploadPayload,
): Promise<EvidenceUploadResponse> {
  const form = new FormData();
  form.append('evidenceBlob', payload.evidenceBlob);
  if (payload.observationId) {
    form.append('observationId', payload.observationId);
  }
  if (payload.note) {
    form.append('note', payload.note);
  }
  return apiPostFormData<EvidenceUploadResponse>(
    `/indicators/${payload.indicatorId}/evidences`,
    form,
  );
}

/** Lista todas las versiones de Evidence de un Indicator (paginadas). */
export async function listEvidences(
  indicatorId: string,
  page = 1,
  pageSize = 20,
): Promise<EvidenceListResponse> {
  return apiGet<EvidenceListResponse>(
    `/indicators/${indicatorId}/evidences`,
    { params: { page, pageSize } },
  );
}

/** Obtiene una versión específica de Evidence (incluye URL pre-firmada S3).
 *  IMPORTANTE: la s3PresignedUrl expira en 15 min. No persistir en caché.
 */
export async function getEvidence(
  indicatorId: string,
  evidenceId: string,
): Promise<Evidence> {
  return apiGet<Evidence>(
    `/indicators/${indicatorId}/evidences/${evidenceId}`,
  );
}
