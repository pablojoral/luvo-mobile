import { useTranslation } from 'react-i18next';

export const useErrorScreenStrings = () => {
  const { t } = useTranslation('common');
  return {
    title: t('errors.boundary.title'),
    body:  t('errors.boundary.body'),
    retry: t('errors.boundary.retry'),
  };
};
