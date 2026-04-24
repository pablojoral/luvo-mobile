import { View } from 'react-native';
import { SvgImage } from 'components/SvgImage/SvgImage';
import { getAvatar } from '../../avatars';

import { useAvatarTheme } from './theme/useAvatarTheme';

interface AvatarProps {
  avatarId?: number | null;
  size?: number;
}

export const Avatar = ({ avatarId, size }: AvatarProps) => {
  const { styles, AVATAR_SIZE_DEFAULT, AVATAR_IMAGE_RATIO } = useAvatarTheme();
  const avatar = getAvatar(avatarId);
  const actualSize = size ?? AVATAR_SIZE_DEFAULT;
  const imageSize = actualSize * AVATAR_IMAGE_RATIO;

  return (
    <View
      style={[
        styles.circle,
        { width: actualSize, height: actualSize, borderRadius: actualSize / 2, backgroundColor: avatar.color },
      ]}
    >
      <SvgImage name={avatar.imageName} width={imageSize} height={imageSize} />
    </View>
  );
};
