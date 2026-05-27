'use client';

import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';
import { CoordinatorHome } from '@/features/dashboard/components/CoordinatorHome';
import { AppShell } from '@/shared/layout/AppShell';
import { ROLES } from '@/shared/constants/roles';

export default function CoordinatorHomePage() {
  return (
    <ProtectedRoute requiredRole={ROLES.CC}>
      <AppShell>
        <CoordinatorHome />
      </AppShell>
    </ProtectedRoute>
  );
}
