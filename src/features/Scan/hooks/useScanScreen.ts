import { SelectorOption } from 'components/PillSelector/PillSelector';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useCameraScanner } from './useCamera';

export const useScanScreen = () => {
  const { t } = useTranslation('common');
  const [selectedOption, setSelectedOption] = useState<string>('qr');
  const isQrSelected = selectedOption === 'qr';

  const { hasPermission, codeScanner } = useCameraScanner(() => {});

  const options: SelectorOption[] = [
    { label: t('scan.tabs.qr'), value: 'qr' },
    { label: t('scan.tabs.code'), value: 'code' },
  ];

  const noAccessMessage = t('scan.noCamera');

  return {
    options,
    selectedOption,
    setSelectedOption,
    isQrSelected,
    hasPermission,
    codeScanner,
    noAccessMessage,
  };
};
