'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { ROLE_LABELS } from '@/domain/entities';
import { ROLES } from '@/shared/constants/roles';
import { NotificationBar } from '@/shared/ui/NotificationBar';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const { user, clearUser } = useAuthStore();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-lg font-bold text-blue-700">
              SIGESA
            </Link>
            {user?.role === ROLES.CC && (
              <nav className="flex gap-4 text-sm">
                <Link href="/cc/home" className="text-gray-600 hover:text-gray-900">
                  Panel Coordinador
                </Link>
              </nav>
            )}
            {user?.role === ROLES.TD && (
              <nav className="flex gap-4 text-sm">
                <Link href="/td/dashboard" className="text-gray-600 hover:text-gray-900">
                  Bandeja de Tareas
                </Link>
              </nav>
            )}
          </div>
          {user && (
            <div className="flex items-center gap-4 text-sm">
              <span className="text-gray-500">{ROLE_LABELS[user.role]}</span>
              <span className="text-gray-700">{user.email}</span>
              <button
                type="button"
                onClick={() => {
                  clearUser();
                  window.location.href = '/login';
                }}
                className="text-red-600 hover:underline"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1">{children}</main>
      <NotificationBar />
    </div>
  );
}
