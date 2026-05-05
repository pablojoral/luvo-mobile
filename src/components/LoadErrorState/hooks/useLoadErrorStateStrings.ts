import { useTranslation } from 'react-i18next';

export const useLoadErrorStateStrings = () => {
  const { t } = useTranslation('common');
  return {
    title:      t('errors.boundary.title'),
    retryLabel: t('errors.boundary.retry'),
  };
};
