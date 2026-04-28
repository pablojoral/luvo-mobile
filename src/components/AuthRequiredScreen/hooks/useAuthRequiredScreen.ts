import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';
import { useTranslation } from 'react-i18next';

export const useAuthRequiredScreen = () => {
  const navigation = useRootStackNavigation();
  const { t } = useTranslation('common');

  const handleSignIn = () => navigation.navigate('Auth');

  return {
    handleSignIn,
    title: t('auth.notSignedIn'),
    defaultSubtitle: t('auth.defaultSubtitle'),
    signInLabel: t('auth.signIn'),
  };
};
