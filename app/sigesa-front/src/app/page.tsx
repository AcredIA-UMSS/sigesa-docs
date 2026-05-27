'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { ROLES } from '@/shared/constants/roles';

export default function HomePage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.replace('/login');
      return;
    }
    if (user.role === ROLES.CC) router.replace('/cc/home');
    else if (user.role === ROLES.TD) router.replace('/td/dashboard');
    else router.replace('/unauthorized');
  }, [isAuthenticated, user, router]);

  return null;
}
