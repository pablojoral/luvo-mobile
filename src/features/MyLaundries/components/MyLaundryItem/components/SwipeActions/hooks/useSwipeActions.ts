import { useTranslation } from 'react-i18next';

export const useSwipeActions = () => {
  const { t } = useTranslation('common');

  return {
    showQRLabel: t('myLaundries.swipe.showQR'),
    removeLabel: t('myLaundries.swipe.remove'),
  };
};
