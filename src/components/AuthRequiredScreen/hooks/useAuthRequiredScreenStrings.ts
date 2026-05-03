import { useTranslation } from 'react-i18next';

export const useAuthRequiredScreenStrings = () => {
  const { t } = useTranslation('common');

  return {
    title: t('auth.notSignedIn'),
    defaultSubtitle: t('auth.defaultSubtitle'),
    signInLabel: t('auth.signIn'),
  };
};
