import { create } from 'zustand';

interface AuthModalState {
  visible: boolean;
  confirmHandler: (() => void) | null;
  show: (confirmHandler: () => void) => void;
  hide: () => void;
}

export const useAuthModalStore = create<AuthModalState>((set) => ({
  visible: false,
  confirmHandler: null,
  show: (confirmHandler) => set({ visible: true, confirmHandler }),
  hide: () => set({ visible: false, confirmHandler: null }),
}));
