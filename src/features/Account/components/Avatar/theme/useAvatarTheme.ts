import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';
import { getAvatar } from '../../../avatars';

interface UseAvatarThemeProps {
  avatarId?: number | null;
  size?: number;
}

const AVATAR_SIZE_DEFAULT = 56;
const AVATAR_IMAGE_RATIO = 0.72;

export const useAvatarTheme = ({ avatarId, size }: UseAvatarThemeProps) => {
  const theme = useTheme();

  const avatar = getAvatar(avatarId);
  const actualSize = size ?? AVATAR_SIZE_DEFAULT;
  const imageSize = actualSize * AVATAR_IMAGE_RATIO;

  const styles = StyleSheet.create({
    circle: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  const circleStyle = useMemo(
    () => ({
      width: actualSize,
      height: actualSize,
      borderRadius: actualSize / 2,
      backgroundColor: avatar.color,
    }),
    [actualSize, avatar.color],
  );

  return { styles, circleStyle, imageSize, avatar, theme };
};
