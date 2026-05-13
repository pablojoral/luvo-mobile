import { View } from 'react-native';
import { SvgImage } from '@luvo/ui';

import { useAvatarTheme } from './theme/useAvatarTheme';

interface AvatarProps {
  avatarId?: number | null;
  size?: number;
  variant?: 'circle' | 'squircle';
}

export const Avatar = ({ avatarId, size, variant = 'circle' }: AvatarProps) => {
  const { styles, circleStyle, imageSize, avatar } = useAvatarTheme({ avatarId, size, variant });

  return (
    <View style={[styles.circle, circleStyle]}>
      <SvgImage name={avatar.imageName} width={imageSize} height={imageSize} />
    </View>
  );
};
