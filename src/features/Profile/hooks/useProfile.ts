import { useFirebaseAuthState, useMe } from 'query/Auth/useAuth';
import type { SettingsMenuItemData } from 'components/SettingsMenu/components/SettingsMenuItem/SettingsMenuItem';
import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';
import { useTranslation } from 'react-i18next';

export const useProfile = () => {
  const { data: firebaseUser } = useFirebaseAuthState();
  const { data: user, isLoading: isLoadingMe } = useMe();
  const rootNavigation = useRootStackNavigation();
  const { t } = useTranslation('common');

  const handleInfo = () => rootNavigation.navigate('Info');

  const handleReport = () => {
    rootNavigation.navigate('Report');
  };

  const profileItems: SettingsMenuItemData[] = [
    { label: t('profile.menu.account'), iconName: 'User', onPress: () => rootNavigation.navigate('Account') },
    { label: t('profile.menu.history'), iconName: 'Clock', onPress: () => rootNavigation.navigate('History') },
    { label: t('profile.menu.settings'), iconName: 'Settings', onPress: () => rootNavigation.navigate('Settings') },
    { label: t('profile.menu.info'), iconName: 'Info', onPress: handleInfo },
    { label: t('profile.menu.report'), iconName: 'AlertTriangle', onPress: handleReport },
  ];

  const authSubtitle = t('auth.defaultSubtitle');

  return { firebaseUser, user, profileItems, isLoading: isLoadingMe, authSubtitle };
};
