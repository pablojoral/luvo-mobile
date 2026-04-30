import { Avatar } from 'features/Account/components/Avatar/Avatar';
import { SvgImage } from 'components/SvgImage/SvgImage';
import { Text } from 'components/Text/Text';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Colors } from 'theme/constants/colors';

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
      <View style={styles.headerContent}>
        <Avatar avatarId={avatarId} size={AVATAR_SIZE} variant="squircle" />

        <View style={styles.textContainer}>
          <Text fontSize="font-size-xl">{greeting}</Text>
          <Text fontSize="font-size-xxl" fontWeight="extrabold">
            {name}
          </Text>
        </View>

        <SvgImage name="luvo-logo-pink" height={46} width={44} />
      </View>

      <Svg
        width="100%"
        height={46}
        viewBox="0 0 390 46"
        preserveAspectRatio="none"
        accessible={false}
      >
        <Path
          d="M0,0 L0,8 C70,46 150,46 210,26 C270,6 340,6 390,22 L390,0 Z"
          fill={Colors['colors-white']}
        />
      </Svg>
    </View>
  );
};
