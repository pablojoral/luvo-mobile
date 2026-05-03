import React from 'react';
import { QRScannerContent } from './components/QRScannerContent/QRScannerContent';
import { useQRScannerComponent } from './hooks/useQRScannerComponent';

interface QRScannerProps {
  /** When true, this instance suppresses the root-level QRScanner camera. */
  override?: boolean;
}

export const QRScanner: React.FC<QRScannerProps> = ({ override }) => {
  const { isOpen, hasOverridingScanner } = useQRScannerComponent(override);

  if (!override && hasOverridingScanner) return null;

  return isOpen ? <QRScannerContent /> : null;
};
