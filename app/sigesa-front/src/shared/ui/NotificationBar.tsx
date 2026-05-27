'use client';

import { useUIStore } from '@/store/uiStore';

const TYPE_STYLES = {
  success: 'bg-green-50 text-green-800 border-green-200',
  error: 'bg-red-50 text-red-800 border-red-200',
  info: 'bg-blue-50 text-blue-800 border-blue-200',
  warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
};

export function NotificationBar() {
  const { notifications, removeNotification } = useUIStore();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex max-w-sm flex-col gap-2">
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`flex items-start justify-between gap-3 rounded-lg border px-4 py-3 text-sm shadow-lg ${TYPE_STYLES[n.type]}`}
        >
          <span>{n.message}</span>
          <button
            type="button"
            className="shrink-0 opacity-60 hover:opacity-100"
            onClick={() => removeNotification(n.id)}
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
