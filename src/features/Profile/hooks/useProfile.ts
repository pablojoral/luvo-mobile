import { useFirebaseAuthState, useMe, useSignOut } from 'query/Auth/useAuth';
import { SettingsMenuItem } from 'components/SettingsMenu/components/SettingsMenuItem/SettingsMenuItem';
import { useMessagesStore } from 'stores/useMessagesStore';
import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';

export const useProfile = () => {
  const { data: firebaseUser } = useFirebaseAuthState();
  const { data: user, isLoading: isLoadingMe } = useMe();
  const { mutate: signOut, isPending: signingOut } = useSignOut();
  const rootNavigation = useRootStackNavigation();
  const { addMessage } = useMessagesStore();
  const handleInfo = () => {
    addMessage({ title: 'Aviso', body: 'Tu lavandería abrirá a las 8am mañana.' });
    addMessage({ body: 'Recuerda retirar tu ropa antes de las 10am.' });
  };

  const handleReport = () => {
    rootNavigation.navigate('Report');
  };

  const profileItems: SettingsMenuItem[] = [
    { label: 'Cuenta', iconName: 'User', onPress: () => {} },
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
