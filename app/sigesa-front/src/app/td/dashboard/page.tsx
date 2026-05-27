'use client';

import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';
import { TechnicianDashboard } from '@/features/dashboard/components/TechnicianDashboard';
import { AppShell } from '@/shared/layout/AppShell';
import { ROLES } from '@/shared/constants/roles';

export default function TechnicianDashboardPage() {
  return (
    <ProtectedRoute requiredRole={ROLES.TD}>
      <AppShell>
        <TechnicianDashboard />
      </AppShell>
    </ProtectedRoute>
  );
}
