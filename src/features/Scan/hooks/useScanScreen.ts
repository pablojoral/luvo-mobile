import { useCallback, useState } from 'react';
import type { SelectorOption } from 'components/PillSelector/PillSelector';
import { useCameraScanner } from './useCamera';
import { useScanQRHandler } from './useScanQRHandler';
import { useScanStrings } from './useScanStrings';

export type ScanMode = 'qr' | 'manual';

export const useScanScreen = () => {
  const strings = useScanStrings();
  const [mode, setMode] = useState<ScanMode>('qr');
  const { handleCode } = useScanQRHandler();

  const { hasPermission, codeScanner } = useCameraScanner(handleCode);

  const handleModeChange = useCallback((value: string) => {
    setMode(value as ScanMode);
  }, []);

  const modeOptions: SelectorOption[] = [
    { label: strings.modeCode, value: 'manual' },
    { label: strings.modeQR, value: 'qr' },
  ];

  return {
    mode,
    handleModeChange,
    modeOptions,
    hasPermission,
    codeScanner,
    handleCode,
    strings,
  };
};
