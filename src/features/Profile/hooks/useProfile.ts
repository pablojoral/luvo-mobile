import { useFirebaseAuthState, useMe } from 'query/Auth/useAuth';
import type { SettingsMenuItemData } from 'components/SettingsMenu/components/SettingsMenuItem/SettingsMenuItem';
import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';
import { useProfileStrings } from './useProfileStrings';

export const useProfile = () => {
  const { data: firebaseUser } = useFirebaseAuthState();
  const { data: user, isLoading: isLoadingMe } = useMe();
  const rootNavigation = useRootStackNavigation();
  const strings = useProfileStrings();

  const handleInfo = () => rootNavigation.navigate('Info');
  const handleReport = () => rootNavigation.navigate('Report');

  const profileItems: SettingsMenuItemData[] = [
    { label: strings.accountLabel,  iconName: 'User',          onPress: () => rootNavigation.navigate('Account') },
    { label: strings.historyLabel,  iconName: 'Clock',         onPress: () => rootNavigation.navigate('History') },
    { label: strings.settingsLabel, iconName: 'Settings',      onPress: () => rootNavigation.navigate('Settings') },
    { label: strings.infoLabel,     iconName: 'Info',          onPress: handleInfo },
    { label: strings.reportLabel,   iconName: 'AlertTriangle', onPress: handleReport },
  ];

  return { firebaseUser, user, profileItems, isLoading: isLoadingMe, title: strings.title, authSubtitle: strings.authSubtitle };
};
