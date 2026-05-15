import { useTranslation } from 'react-i18next';

export const useMyLaundriesStrings = () => {
  const { t } = useTranslation('common');
  return {
    title:              t('myLaundries.title'),
    authSubtitle:       t('myLaundries.authSubtitle'),
    authDefaultSubtitle: t('auth.defaultSubtitle'),
    authTitle:          t('auth.title'),
    authSignInLabel:    t('auth.signIn'),
    loadError:          t('myLaundries.loadError'),
  };
};
