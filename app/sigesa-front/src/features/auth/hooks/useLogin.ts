'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { login, type LoginPayload } from '../services/authApi';
import { useAuthStore } from '@/store/authStore';
import type { AuthenticatedUser } from '@/domain/entities';
import { ROLES } from '@/shared/constants/roles';

function dashboardPathForRole(role: AuthenticatedUser['role']): string {
  switch (role) {
    case ROLES.CC:
      return '/cc/home';
    case ROLES.TD:
      return '/td/dashboard';
    case ROLES.JD:
      return '/unauthorized';
    default:
      return '/login';
  }
}

export function useLogin() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess: (user) => {
      setUser(user);
      router.replace(dashboardPathForRole(user.role));
    },
  });
}
