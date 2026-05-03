import { useCameraScanner } from 'features/Scan/hooks/useCamera';
import { useCallback, useRef } from 'react';
import { useQRScanner } from 'stores/useQRScanner';

export const useQRScannerContent = () => {
  const { onScan, close } = useQRScanner();
  const handledRef = useRef(false);

  const handleCodeScanned = useCallback(
    (code: string) => {
      if (handledRef.current) return;
      handledRef.current = true;
      onScan?.(code);
      close();
    },
    [onScan, close],
  );

  const { hasPermission, codeScanner } = useCameraScanner(handleCodeScanned);

  return { hasPermission, codeScanner, close };
};
