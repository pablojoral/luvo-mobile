import { useTranslation } from 'react-i18next';

export const useProfileGuestStrings = () => {
  const { t } = useTranslation('common');

  return {
    title: t('auth.notSignedIn'),
    subtitle: t('auth.defaultSubtitle'),
    signInLabel: t('auth.signIn'),
  };
};
