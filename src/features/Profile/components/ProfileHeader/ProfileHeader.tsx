import { SvgImage } from 'components/SvgImage/SvgImage';
import { Text } from 'components/Text/Text';
import { View } from 'react-native';
import { Avatar } from 'features/Account/components/Avatar/Avatar';

import { useProfileHeader } from './hooks/useProfileHeader';
import { useProfileHeaderTheme } from './theme/useProfileHeaderTheme';

interface ProfileHeaderProps {
  name: string;
  avatarId?: number | null;
}

export const ProfileHeader = ({ name, avatarId }: ProfileHeaderProps) => {
  const { styles, containerTopStyle, AVATAR_SIZE } = useProfileHeaderTheme();
  const { greeting } = useProfileHeader();

  return (
    <View style={[styles.container, containerTopStyle]}>
      <View style={styles.contentContainer}>
        <View style={styles.avatarTile}>
          <Avatar avatarId={avatarId} size={AVATAR_SIZE} />
        </View>
        <View style={styles.textContainer}>
          <Text fontSize={'font-size-xxl'} fontWeight={'regular'}>
            {greeting}
          </Text>
          <Text fontSize={'font-size-xxl'} fontWeight={'extrabold'}>
            {name}
          </Text>
        </View>
      </View>
      <View style={styles.logoContainer}>
        <SvgImage name="luvo-logo-pink" height={40} />
      </View>
    </View>
  );
};
