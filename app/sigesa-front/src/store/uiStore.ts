/**
 * Store global de UI (Zustand).
 * Centraliza estado de modales y notificaciones transitorias.
 */
import { create } from 'zustand';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

interface UIState {
  notifications: Notification[];
  addNotification: (n: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;

  uploadModalOpen: boolean;
  uploadModalIndicatorId: string | null;
  uploadModalObservationId: string | null;
  openUploadModal: (indicatorId: string, observationId?: string) => void;
  closeUploadModal: () => void;

  rejectModalOpen: boolean;
  rejectModalIndicatorId: string | null;
  openRejectModal: (indicatorId: string) => void;
  closeRejectModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  notifications: [],

  addNotification: (n) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        { ...n, id: crypto.randomUUID() },
      ],
    })),

  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),

  uploadModalOpen: false,
  uploadModalIndicatorId: null,
  uploadModalObservationId: null,

  openUploadModal: (indicatorId, observationId) =>
    set({
      uploadModalOpen: true,
      uploadModalIndicatorId: indicatorId,
      uploadModalObservationId: observationId ?? null,
    }),

  closeUploadModal: () =>
    set({
      uploadModalOpen: false,
      uploadModalIndicatorId: null,
      uploadModalObservationId: null,
    }),

  rejectModalOpen: false,
  rejectModalIndicatorId: null,

  openRejectModal: (indicatorId) =>
    set({ rejectModalOpen: true, rejectModalIndicatorId: indicatorId }),

  closeRejectModal: () =>
    set({ rejectModalOpen: false, rejectModalIndicatorId: null }),
}));
