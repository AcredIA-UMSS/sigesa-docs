/**
 * Evidencia normativa — Append-Only (ADR_001, FSD-BR-02)
 * NUNCA se emite DELETE ni UPDATE destructivo contra esta entidad.
 * La corrección se hace creando una nueva versión (supersedesId).
 */
export interface Evidence {
  evidenceId: string;
  indicatorId: string;
  version: number;
  supersedesId: string | null;   // referencia a versión anterior
  observationId: string | null;  // obligatorio si versión es subsanación
  /**
   * URL pre-firmada S3 con vigencia de 15 minutos (X-Amz-Expires=900).
   * NUNCA persistir en caché local (localStorage / sessionStorage).
   * Siempre solicitar URL fresca al backend antes de descargar.
   */
  s3PresignedUrl: string;
  contentSha256: string;
  createdByRole: string;
  createdAt: string;
}

export interface EvidenceListResponse {
  indicatorId: string;
  evidences: Evidence[];
  total: number;
  page: number;
}

export interface EvidenceUploadPayload {
  indicatorId: string;
  evidenceBlob: File;
  observationId: string | null;
  note?: string;
}

export interface EvidenceUploadResponse {
  evidenceId: string;
  version: number;
  s3Key: string;
}
