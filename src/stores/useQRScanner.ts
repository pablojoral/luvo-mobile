import { create } from 'zustand';

interface QRScannerState {
  isOpen: boolean;
  onScan: ((code: string) => void) | null;
  open: (onScan: (code: string) => void) => void;
  close: () => void;
}

export const useQRScanner = create<QRScannerState>(set => ({
  isOpen: false,
  onScan: null,
  open: onScan => set({ isOpen: true, onScan }),
  close: () => set({ isOpen: false, onScan: null }),
}));
