import { Avatar } from 'features/Account/components/Avatar/Avatar';
import { SvgImage } from 'components/SvgImage/SvgImage';
import { Text } from 'components/Text/Text';
import { View } from 'react-native';

import { useProfileHeader } from './hooks/useProfileHeader';
import { useProfileHeaderTheme } from './theme/useProfileHeaderTheme';

interface ProfileHeaderProps {
  name: string;
  avatarId?: number | null;
}

export const ProfileHeader = ({ name, avatarId }: ProfileHeaderProps) => {
  const { styles, AVATAR_SIZE } = useProfileHeaderTheme();
  const { greeting } = useProfileHeader();

  return (
    <View style={styles.container}>
        <Avatar avatarId={avatarId} size={AVATAR_SIZE} variant="squircle" />

        <View style={styles.textContainer}>
          <Text fontSize="font-size-xl">{greeting}</Text>
          <Text fontSize="font-size-xxl" fontWeight="extrabold">
            {name}
          </Text>
        </View>

        <SvgImage name="luvo-logo-pink" height={46} width={44} />
    </View>
  );
};
