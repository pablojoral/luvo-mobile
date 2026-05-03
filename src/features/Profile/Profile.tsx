import { AuthRequiredScreen } from 'components/AuthRequiredScreen/AuthRequiredScreen';
import { SettingsMenu } from 'components/SettingsMenu/SettingsMenu';
import { View } from 'react-native';

import { ProfileHeader } from './components/ProfileHeader/ProfileHeader';
import { useProfile } from './hooks/useProfile';
import { useProfileTheme } from './theme/useProfileTheme';
import { ActivityIndicator } from 'components/ActivityIndicator/ActivityIndicator';

export const Profile = () => {
  const { firebaseUser, user, profileItems, isLoading } = useProfile();
  const { styles } = useProfileTheme();

  return (
    <View style={styles.container}>
      {!firebaseUser ? (
        <AuthRequiredScreen subtitle="Inicia sesión para ver tu perfil y gestionar tu cuenta." />
      ) : isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <>
          <ProfileHeader name={user?.name ?? user?.email ?? ''} avatarId={user?.avatarId} />
          <View style={styles.contentContainer}>
            <View style={styles.menusContainer}>
              <SettingsMenu items={profileItems} />
            </View>
          </View>
        </>
      )}
    </View>
  );
};
