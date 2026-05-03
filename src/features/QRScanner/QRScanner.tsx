import React from 'react';
import { useQRScanner } from 'stores/useQRScanner';
import { QRScannerContent } from './components/QRScannerContent/QRScannerContent';
import { useQRScannerComponent } from './hooks/useQRScannerComponent';

export const QRScanner: React.FC = () => {
  const isOpen = useQRScanner(s => s.isOpen);
  return isOpen ? <QRScannerContent /> : null;
};
