import { useTranslation } from 'react-i18next';

export const useFAQStrings = () => {
  const { t } = useTranslation('common');
  return {
    title:       t('info.faq.title'),
    loadingText: t('info.loading'),
    loadError:   t('info.loadError'),
  };
};
