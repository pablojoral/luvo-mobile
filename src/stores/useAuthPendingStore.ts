import { create } from 'zustand';

interface AuthPendingState {
  pendingAction: (() => void) | null;
  setPendingAction: (fn: (() => void) | null) => void;
}

export const useAuthPendingStore = create<AuthPendingState>((set) => ({
  pendingAction: null,
  setPendingAction: (fn) => set({ pendingAction: fn }),
}));
