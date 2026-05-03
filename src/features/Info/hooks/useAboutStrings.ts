import { useTranslation } from 'react-i18next';

export const useAboutStrings = () => {
  const { t } = useTranslation('common');
  return {
    title:       t('info.about.title'),
    loadingText: t('info.loading'),
    loadError:   t('info.loadError'),
  };
};
