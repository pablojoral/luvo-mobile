import { SvgImage } from 'components/SvgImage/SvgImage';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { IconSize } from 'theme/types/Theme';

import { useLoader } from './hooks/useLoader';
import { useLoaderTheme } from './theme/useLoaderTheme';

interface LoaderProps {
  size?: IconSize;
}

export const Loader = ({ size = 'icon-size-xxxxxxl' }: LoaderProps) => {
  const { avatar, animatedStyle } = useLoader();
  const { styles, iconSize } = useLoaderTheme(size);

  return (
    <View style={styles.container}>
      <Animated.View style={animatedStyle}>
        <SvgImage name={avatar.imageName} height={iconSize} width={iconSize} />
      </Animated.View>
    </View>
  );
};
