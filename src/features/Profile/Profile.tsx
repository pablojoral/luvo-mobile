import { View } from 'react-native';
import { SettingsMenu } from 'components/SettingsMenu/SettingsMenu';

import { ProfileHeader } from './components/ProfileHeader/ProfileHeader';
import { ProfileGuest } from './components/ProfileGuest/ProfileGuest';
import { useProfile } from './hooks/useProfile';
import { useProfileTheme } from './theme/useProfileTheme';

export const Profile = () => {
  const { firebaseUser, user, profileItems, bottomItems } = useProfile();
  const { styles } = useProfileTheme();

  if (!firebaseUser) return <ProfileGuest />;

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <ProfileHeader name={user?.name ?? user?.email ?? ''} />
        <View style={styles.menusContainer}>
          <SettingsMenu items={profileItems} />
          <SettingsMenu items={bottomItems} />
        </View>
      </View>
    </View>
  );
};
