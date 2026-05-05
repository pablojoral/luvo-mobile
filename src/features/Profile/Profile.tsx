import { AuthRequiredScreen } from 'components/AuthRequiredScreen/AuthRequiredScreen';
import { LoadErrorState } from 'components/LoadErrorState/LoadErrorState';
import { Loader } from 'components/Loader/Loader';
import { SafeScreenHeader } from 'components/SafeScreenHeader/SafeScreenHeader';
import { SettingsMenu } from 'components/SettingsMenu/SettingsMenu';
import { View } from 'react-native';

import { ProfileHeader } from './components/ProfileHeader/ProfileHeader';
import { useProfile } from './hooks/useProfile';
import { useProfileTheme } from './theme/useProfileTheme';

export const Profile = () => {
  const { firebaseUser, user, profileItems, isLoading, isError, refetch, title, authSubtitle, profileLoadError } = useProfile();
  const { styles } = useProfileTheme();

  return (
    <View style={styles.container}>
      {!firebaseUser ? (
        <AuthRequiredScreen subtitle={authSubtitle} />
      ) : isLoading ? (
        <>
          <SafeScreenHeader title={title} hideBack />
          <View style={styles.loadingContainer}>
            <Loader size={'icon-size-128'} />
          </View>
        </>
      ) : isError ? (
        <>
          <SafeScreenHeader title={title} hideBack />
          <View style={styles.loadingContainer}>
            <LoadErrorState message={profileLoadError} onRetry={refetch} />
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
