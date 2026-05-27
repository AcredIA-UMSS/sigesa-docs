/**
 * Cliente HTTP base (Axios).
 * Reglas de diseño (api_contracts_cloud.md §1):
 *  - Authorization: Bearer JWT en todas las peticiones autenticadas.
 *  - Idempotency-Key: UUID en todos los POST de mutación.
 *  - Las URLs pre-firmadas S3 nunca se cachean (X-Amz-Expires=900).
 *  - Respuestas de error siguen esquema { error: { code, message, ... } }.
 */
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { v4 as uuidv4 } from 'uuid';

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? '/api/v1';

export const httpClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

httpClient.interceptors.request.use((config) => {
  const token =
    typeof window !== 'undefined'
      ? sessionStorage.getItem('sigesa_access_token')
      : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/** Agrega Idempotency-Key a un POST de mutación. */
export function withIdempotencyKey(
  config?: AxiosRequestConfig,
): AxiosRequestConfig {
  return {
    ...config,
    headers: {
      ...config?.headers,
      'Idempotency-Key': uuidv4(),
    },
  };
}

/** Extrae el código de error canónico del backend. */
export function extractApiErrorCode(err: unknown): string {
  if (err instanceof AxiosError && err.response?.data?.error?.code) {
    return err.response.data.error.code as string;
  }
  return 'UNKNOWN_ERROR';
}

export class ApiError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly status?: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

function throwApiError(err: unknown): never {
  if (err instanceof AxiosError) {
    const code = extractApiErrorCode(err);
    const message =
      err.response?.data?.error?.message ?? err.message;
    throw new ApiError(code, message, err.response?.status);
  }
  throw err;
}

/** GET helper con manejo de errores uniforme. */
export async function apiGet<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  try {
    const res = await httpClient.get<T>(url, config);
    return res.data;
  } catch (err) {
    throwApiError(err);
  }
}

/** POST helper con Idempotency-Key automático. */
export async function apiPost<T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> {
  try {
    const res = await httpClient.post<T>(url, data, withIdempotencyKey(config));
    return res.data;
  } catch (err) {
    throwApiError(err);
  }
}

/** POST multipart/form-data con Idempotency-Key y validación de tamaño. */
export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB (api_contracts_cloud §2.1)

export async function apiPostFormData<T>(
  url: string,
  formData: FormData,
): Promise<T> {
  const blob = formData.get('evidenceBlob');
  if (blob instanceof File && blob.size > MAX_FILE_SIZE) {
    throw new ApiError(
      'EVIDENCE_TOO_LARGE',
      `El archivo supera el límite de 50 MB. Tamaño recibido: ${(blob.size / 1024 / 1024).toFixed(1)} MB`,
      413,
    );
  }
  try {
    const res = await httpClient.post<T>(url, formData, {
      ...withIdempotencyKey(),
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  } catch (err) {
    throwApiError(err);
  }
}
