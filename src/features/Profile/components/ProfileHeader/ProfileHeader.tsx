import { SvgIcon } from 'components/SvgIcon/SvgIcon';
import { SvgImage } from 'components/SvgImage/SvgImage';
import { Text } from 'components/Text/Text';
import { View } from 'react-native';

import { useProfileHeaderTheme } from './theme/useProfileHeaderTheme';

interface ProfileHeaderProps {
  name: string;
}

export const ProfileHeader = ({ name }: ProfileHeaderProps) => {
  const { styles } = useProfileHeaderTheme();

  const title = 'Hola,';

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <SvgImage name={'profile-placeholder'} height={86} width={86} />
        <View style={styles.textContainer}>
          <Text fontSize={'font-size-xxl'}>{title}</Text>
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
