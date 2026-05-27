/**
 * Store global de autenticación (Zustand).
 * El token se guarda solo en sessionStorage (no localStorage) para
 * respetar la política de sesión UMSS (ADR_007 §4.2).
 * Las URLs pre-firmadas S3 NUNCA se almacenan aquí.
 */
import { create } from 'zustand';
import type { AuthenticatedUser } from '@/domain/entities';

const TOKEN_KEY = 'sigesa_access_token';
const USER_KEY = 'sigesa_user';

interface AuthState {
  user: AuthenticatedUser | null;
  isAuthenticated: boolean;
  setUser: (user: AuthenticatedUser) => void;
  clearUser: () => void;
  loadFromSession: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  setUser: (user) => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(TOKEN_KEY, user.accessToken);
      sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    }
    set({ user, isAuthenticated: true });
  },

  clearUser: () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(TOKEN_KEY);
      sessionStorage.removeItem(USER_KEY);
    }
    set({ user: null, isAuthenticated: false });
  },

  loadFromSession: () => {
    if (typeof window === 'undefined') return;
    const token = sessionStorage.getItem(TOKEN_KEY);
    const raw = sessionStorage.getItem(USER_KEY);
    if (!token || !raw) return;
    try {
      const user = JSON.parse(raw) as AuthenticatedUser;
      set({ user, isAuthenticated: true });
    } catch {
      sessionStorage.removeItem(TOKEN_KEY);
      sessionStorage.removeItem(USER_KEY);
    }
  },
}));
