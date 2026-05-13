import { useCameraScanner } from 'features/Scan/hooks/useCamera';
import { useScanStrings } from 'features/Scan/hooks/useScanStrings';
import { useCallback, useRef, useState } from 'react';
import { Vibration } from 'react-native';
import { useQRScanner } from 'stores/useQRScanner';
import { useMessagesStore } from 'stores/useMessagesStore';
import { parseQRCode } from 'utils/parseQRCode';
import type { SelectorOption } from '@luvo/ui';

export type ScannerMode = 'qr' | 'manual';

export const useQRScannerContent = () => {
  const { onScan, close, context } = useQRScanner();
  const { addMessage } = useMessagesStore();
  const handledRef = useRef(false);
  const [mode, setMode] = useState<ScannerMode>('qr');
  const [scanned, setScanned] = useState(false);
  const strings = useScanStrings(context);

  const handleCodeScanned = useCallback(
    (code: string) => {
      if (handledRef.current) return;

      const result = parseQRCode(code);
      if (result.type === 'unknown') {
        handledRef.current = true;
        setScanned(true);
        Vibration.vibrate();
        addMessage({
          title: strings.unknownTitle,
          body: strings.unknownBody,
          onDismiss: () => {
            handledRef.current = false;
            setScanned(false);
          },
        });
        return;
      }

      handledRef.current = true;
      setScanned(true);
      Vibration.vibrate();
      onScan?.(code);
      close();
    },
    [onScan, close, addMessage, strings],
  );

  const handleManualCode = useCallback(
    (code: string) => {
      onScan?.(`luvo://register-access?code=${code}`);
    },
    [onScan],
  );

  const { hasPermission, codeScanner } = useCameraScanner(handleCodeScanned);

  const modeOptions: SelectorOption[] = strings.showCodeTab
    ? [
        { label: strings.modeCode, value: 'manual' },
        { label: strings.modeQR,   value: 'qr' },
      ]
    : [];

  const handleModeChange = useCallback((value: string) => {
    const newMode = value as ScannerMode;
    if (newMode === 'qr') {
      handledRef.current = false;
      setScanned(false);
    }
    setMode(newMode);
  }, []);

  return {
    hasPermission,
    codeScanner,
    close,
    mode,
    scanned,
    handleModeChange,
    handleManualCode,
    modeOptions,
    strings,
  };
};
