/**
 * Auth Service — cliente REST.
 * Contrato: docs/04_fsd/api_contracts.md §3 (API-AUTH-01)
 * ADR_007: JWT stateless, solo @umss.edu.bo
 */
import { apiPost } from '@/lib/httpClient';
import type { AuthenticatedUser } from '@/domain/entities';

export interface LoginPayload {
  email: string;
  password: string;
}

export type LoginResponse = AuthenticatedUser;

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  return apiPost<LoginResponse>('/auth/login', payload);
}
