import { create } from 'zustand';

interface QRScannerState {
  isOpen: boolean;
  onScan: ((code: string) => void) | null;
  open: (onScan: (code: string) => void) => void;
  close: () => void;
  hasOverridingScanner: boolean;
  setHasOverridingScanner: (val: boolean) => void;
}

export const useQRScanner = create<QRScannerState>(set => ({
  isOpen: false,
  onScan: null,
  open: onScan => set({ isOpen: true, onScan }),
  close: () => set({ isOpen: false, onScan: null }),
  hasOverridingScanner: false,
  setHasOverridingScanner: val => set({ hasOverridingScanner: val }),
}));
