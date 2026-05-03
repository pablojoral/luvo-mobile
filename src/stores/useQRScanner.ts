import { create } from 'zustand';

export type ScannerContext = 'general' | 'report';

interface QRScannerState {
  isOpen: boolean;
  context: ScannerContext;
  onScan: ((code: string) => void) | null;
  open: (onScan: (code: string) => void, context?: ScannerContext) => void;
  close: () => void;
}

export const useQRScanner = create<QRScannerState>(set => ({
  isOpen: false,
  context: 'general',
  onScan: null,
  open: (onScan, context = 'general') => set({ isOpen: true, onScan, context }),
  close: () => set({ isOpen: false, onScan: null, context: 'general' }),
}));
