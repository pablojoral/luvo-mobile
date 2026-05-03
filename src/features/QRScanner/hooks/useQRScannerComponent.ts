import { useEffect } from 'react';
import { useQRScanner } from 'stores/useQRScanner';

export const useQRScannerComponent = (override?: boolean) => {
  const isOpen = useQRScanner(s => s.isOpen);
  const hasOverridingScanner = useQRScanner(s => s.hasOverridingScanner);
  const setHasOverridingScanner = useQRScanner(s => s.setHasOverridingScanner);

  useEffect(() => {
    if (!override) return;
    setHasOverridingScanner(true);
    return () => setHasOverridingScanner(false);
  }, [override, setHasOverridingScanner]);

  return { isOpen, hasOverridingScanner };
};
