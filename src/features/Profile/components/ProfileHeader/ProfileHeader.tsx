import { SvgIcon } from 'components/SvgIcon/SvgIcon';
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
  const { styles, AVATAR_SIZE } = useProfileHeaderTheme();
  const { greeting } = useProfileHeader();

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Avatar avatarId={avatarId} size={AVATAR_SIZE} />
        <View style={styles.textContainer}>
          <Text fontSize={'font-size-xxl'}>{greeting}</Text>
          <Text fontSize={'font-size-xxl'} fontWeight={'semibold'}>
            {name}
          </Text>
        </View>
      </View>
      <View style={styles.iconContainer}>
        <SvgIcon name="LuvoCircle" size="font-size-xxl" />
      </View>
    </View>
  );
};
