/**
 * Audit Service — cliente REST.
 * Contrato canónico: docs/05_dti/api_contracts_cloud.md §3
 * Endpoints:
 *   POST /indicators/{id}/approve        (TD exclusivo)
 *   POST /indicators/{id}/reject         (TD exclusivo)
 *   GET  /indicators/{id}/observations   (CC, TD, JD)
 *   GET  /indicators/{id}/state-history  (TD, JD)
 */
import { apiGet, apiPost } from '@/lib/httpClient';
import type {
  ApproveIndicatorPayload,
  ApproveIndicatorResponse,
  RejectIndicatorPayload,
  RejectIndicatorResponse,
  ObservationListResponse,
  StateHistoryEntry,
} from '@/domain/entities';

/** [TD] Aprueba un Indicator.
 *  Solo válido si estado actual es SUBIDO o SUBSANADO (409 en caso contrario).
 */
export async function approveIndicator(
  indicatorId: string,
  payload: ApproveIndicatorPayload = {},
): Promise<ApproveIndicatorResponse> {
  return apiPost<ApproveIndicatorResponse>(
    `/indicators/${indicatorId}/approve`,
    payload,
  );
}

/** [TD] Rechaza un Indicator y crea una Observation.
 *  Solo válido si estado actual es SUBIDO o SUBSANADO.
 *  reason: mínimo 20 caracteres (validado en backend y en frontend).
 */
export async function rejectIndicator(
  indicatorId: string,
  payload: RejectIndicatorPayload,
): Promise<RejectIndicatorResponse> {
  return apiPost<RejectIndicatorResponse>(
    `/indicators/${indicatorId}/reject`,
    payload,
  );
}

/** Lista las Observations de un Indicator (CC solo su carrera, TD global). */
export async function listObservations(
  indicatorId: string,
): Promise<ObservationListResponse> {
  return apiGet<ObservationListResponse>(
    `/indicators/${indicatorId}/observations`,
  );
}

/** Historial completo de transiciones de estado (TD, JD). */
export async function getStateHistory(
  indicatorId: string,
): Promise<{ indicatorId: string; currentState: string; history: StateHistoryEntry[] }> {
  return apiGet(`/indicators/${indicatorId}/state-history`);
}
