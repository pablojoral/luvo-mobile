import { View } from 'react-native';
import { SvgImage } from 'components/SvgImage/SvgImage';

import { useAvatarTheme } from './theme/useAvatarTheme';

interface AvatarProps {
  avatarId?: number | null;
  size?: number;
}

export const Avatar = ({ avatarId, size }: AvatarProps) => {
  const { styles, circleStyle, imageSize, avatar } = useAvatarTheme({ avatarId, size });

  return (
    <View style={[styles.circle, circleStyle]}>
      <SvgImage name={avatar.imageName} width={imageSize} height={imageSize} />
    </View>
  );
};
