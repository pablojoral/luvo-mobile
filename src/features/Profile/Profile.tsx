import { AuthRequiredScreen } from 'components/AuthRequiredScreen/AuthRequiredScreen';
import { SafeScreenHeader } from 'components/SafeScreenHeader/SafeScreenHeader';
import { SettingsMenu } from 'components/SettingsMenu/SettingsMenu';
import { View } from 'react-native';

import { ProfileHeader } from './components/ProfileHeader/ProfileHeader';
import { useProfile } from './hooks/useProfile';
import { useProfileTheme } from './theme/useProfileTheme';
import { Loader } from 'components/Loader/Loader';

export const Profile = () => {
  const { firebaseUser, user, profileItems, isLoading, title, authSubtitle } = useProfile();
  const { styles } = useProfileTheme();

  return (
    <View style={styles.container}>
      {!firebaseUser ? (
        <AuthRequiredScreen subtitle={authSubtitle} />
      ) : isLoading ? (
        <>
          <SafeScreenHeader title={title} hideBack />
          <View style={styles.loadingContainer}>
            <Loader />
          </View>
        </>
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
