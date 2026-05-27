'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { SIGESARole } from '@/domain/entities';
import { useAuthStore } from '@/store/authStore';

interface ProtectedRouteProps {
  requiredRole: SIGESARole;
  children: React.ReactNode;
}

/**
 * Guarda de ruta basado en rol RBAC.
 * Redirige a /login si no hay sesión activa.
 * Redirige a /unauthorized si el rol no coincide.
 */
export function ProtectedRoute({ requiredRole, children }: ProtectedRouteProps) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
      return;
    }
    if (user?.role !== requiredRole) {
      router.replace('/unauthorized');
    }
  }, [isAuthenticated, user, requiredRole, router]);

  if (!isAuthenticated || user?.role !== requiredRole) {
    return null;
  }

  return <>{children}</>;
}
