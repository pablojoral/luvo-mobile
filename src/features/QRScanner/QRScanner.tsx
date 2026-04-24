import React, { useEffect } from 'react';
import { useQRScanner } from 'stores/useQRScanner';
import { QRScannerContent } from './components/QRScannerContent/QRScannerContent';

interface QRScannerProps {
  /** When true, this instance suppresses the root-level QRScanner camera. */
  override?: boolean;
}

export const QRScanner: React.FC<QRScannerProps> = ({ override }) => {
  const isOpen = useQRScanner(s => s.isOpen);
  const hasOverridingScanner = useQRScanner(s => s.hasOverridingScanner);
  const setHasOverridingScanner = useQRScanner(s => s.setHasOverridingScanner);

  useEffect(() => {
    if (!override) return;
    setHasOverridingScanner(true);
    return () => setHasOverridingScanner(false);
  }, [override, setHasOverridingScanner]);

  // Root instance: yield to a higher-priority scanner mounted inside a modal
  if (!override && hasOverridingScanner) return null;

  return isOpen ? <QRScannerContent /> : null;
};
