import { useTranslation } from 'react-i18next';

export const useLaundryQRScreenStrings = () => {
  const { t } = useTranslation('common');

  return {
    shareHint: t('laundryQR.shareHint'),
  };
};
