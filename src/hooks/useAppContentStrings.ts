import { useTranslation } from 'react-i18next';

export const useAppContentStrings = () => {
  const { t } = useTranslation('common');
  return {
    errorBoundaryTitle:   t('errors.boundary.title'),
    errorBoundaryBody:    t('errors.boundary.body'),
    errorBoundaryRetry:   t('errors.boundary.retry'),
  };
};
