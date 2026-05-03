import { useTranslation } from 'react-i18next';

export const useTermsStrings = () => {
  const { t } = useTranslation('common');
  return {
    title:       t('info.terms.title'),
    loadingText: t('info.loading'),
    loadError:   t('info.loadError'),
  };
};
