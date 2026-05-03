import { useTranslation } from 'react-i18next';
import type { ScannerContext } from 'stores/useQRScanner';

export const useScanStrings = (context: ScannerContext = 'general') => {
  const { t } = useTranslation('common');
  const isReport = context === 'report';

  return {
    modeCode:     t('scan.tabs.code'),
    modeQR:       t('scan.tabs.qr'),
    noCamera:     t('scan.noCamera'),
    codeLabel:    t('scan.codeSection.title'),
    codeSubtitle: t('scan.codeSection.subtitle'),
    codeSubmit:   t('scan.codeSection.submit'),
    qrTitle:      t('scan.qr.title'),
    qrSubtitle:   isReport ? t('scan.report.subtitle') : t('scan.qr.subtitle'),
    close:        t('actions.close'),
    unknownTitle: t('qr.unknown.title'),
    unknownBody:  t('qr.unknown.body'),
    showCodeTab:  !isReport,
  };
};
