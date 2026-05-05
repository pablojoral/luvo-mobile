import { useTranslation } from 'react-i18next';

export const useMyLaundriesStrings = () => {
  const { t } = useTranslation('common');
  return {
    title:        t('myLaundries.title'),
    authSubtitle: t('myLaundries.authSubtitle'),
    loadError:    t('myLaundries.loadError'),
  };
};
