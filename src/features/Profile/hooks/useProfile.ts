import { useFirebaseAuthState, useMe, useSignOut } from 'query/Auth/useAuth';
import { SettingsMenuItem } from 'components/SettingsMenu/components/SettingsMenuItem/SettingsMenuItem';
import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';

export const useProfile = () => {
  const { data: firebaseUser } = useFirebaseAuthState();
  const { data: user, isLoading: isLoadingMe } = useMe();
  const { mutate: signOut, isPending: signingOut } = useSignOut();
  const rootNavigation = useRootStackNavigation();
  const handleInfo = () => rootNavigation.navigate('Info');

  const handleReport = () => {
    rootNavigation.navigate('Report');
  };

  const profileItems: SettingsMenuItem[] = [
    { label: 'Cuenta', iconName: 'User', onPress: () => rootNavigation.navigate('Account') },
    { label: 'Historial', iconName: 'Clock', onPress: () => rootNavigation.navigate('History') },
    { label: 'Configuración', iconName: 'Settings', onPress: () => rootNavigation.navigate('Settings') },
    { label: 'Información', iconName: 'Info', onPress: handleInfo },
    { label: 'Reportar', iconName: 'AlertTriangle', onPress: handleReport },
  ];

  const bottomItems: SettingsMenuItem[] = [
    {
      label: signingOut ? 'Cerrando sesión...' : 'Cerrar Sesión',
      iconName: 'LogOut',
      onPress: () => signOut(),
    },
  ];

  return { firebaseUser, user, profileItems, bottomItems, isLoading: isLoadingMe };
};
