import { useFirebaseAuthState, useMe, useSignOut } from 'query/Auth/useAuth';
import { SettingsMenuItem } from 'components/SettingsMenu/components/SettingsMenuItem/SettingsMenuItem';
import { useProfileStackNavigation } from 'navigation/ProfileStackNavigator/hooks/useProfileStackNavigation';

export const useProfile = () => {
  const { data: firebaseUser } = useFirebaseAuthState();
  const { data: user } = useMe();
  const { mutate: signOut, isPending: signingOut } = useSignOut();
  const navigation = useProfileStackNavigation();

  const profileItems: SettingsMenuItem[] = [
    { label: 'Mis lavanderías', iconName: 'Star', onPress: () => navigation.navigate('MyLaundries') },
    { label: 'Cuenta', iconName: 'User', onPress: () => {} },
    { label: 'Notificaciones', iconName: 'Bell', onPress: () => {} },
    { label: 'Información', iconName: 'Info', onPress: () => {} },
    { label: 'Reportar', iconName: 'AlertTriangle', onPress: () => {} },
  ];

  const bottomItems: SettingsMenuItem[] = [
    {
      label: signingOut ? 'Cerrando sesión...' : 'Cerrar Sesión',
      iconName: 'LogOut',
      onPress: () => signOut(),
    },
  ];

  return { firebaseUser, user, profileItems, bottomItems };
};
