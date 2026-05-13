import { AuthRequiredScreen, Loader, SafeScreenHeader, SettingsMenu } from '@luvo/ui';
import { LoadErrorState } from 'components/LoadErrorState/LoadErrorState';
import { View } from 'react-native';

import { ProfileHeader } from './components/ProfileHeader/ProfileHeader';
import { useProfile } from './hooks/useProfile';
import { useProfileTheme } from './theme/useProfileTheme';

export const Profile = () => {
  const { firebaseUser, user, profileItems, isLoading, isError, refetch, title, authSubtitle, authDefaultSubtitle, authTitle, authSignInLabel, profileLoadError } = useProfile();
  const { styles } = useProfileTheme();

  return (
    <View style={styles.container}>
      {!firebaseUser ? (
        <AuthRequiredScreen
          subtitle={authSubtitle}
          defaultSubtitle={authDefaultSubtitle}
          title={authTitle}
          signInLabel={authSignInLabel}
          onSignIn={() => {}}
        />
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
