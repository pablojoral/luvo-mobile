import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';
import { getAvatar } from '../../../avatars';

interface UseAvatarThemeProps {
  avatarId?: number | null;
  size?: number;
  variant?: 'circle' | 'squircle';
}

const AVATAR_SIZE_DEFAULT = 56;
const AVATAR_IMAGE_RATIO = 0.72;
const AVATAR_IMAGE_RATIO_SQUIRCLE = 0.84;

export const useAvatarTheme = ({ avatarId, size, variant = 'circle' }: UseAvatarThemeProps) => {
  const theme = useTheme();

  const avatar = getAvatar(avatarId);
  const actualSize = size ?? AVATAR_SIZE_DEFAULT;
  const isSquircle = variant === 'squircle';
  const imageSize = actualSize * (isSquircle ? AVATAR_IMAGE_RATIO_SQUIRCLE : AVATAR_IMAGE_RATIO);

  const styles = StyleSheet.create({
    circle: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  const circleStyle = useMemo(
    () =>
      isSquircle
        ? {
            width: actualSize,
            height: actualSize,
            borderRadius: theme.cornerRad['corner-rad-xl'],
            backgroundColor: avatar.color + '66',
            borderWidth: theme.borderWidth['border-width-xs'],
            borderColor: avatar.color,
          }
        : {
            width: actualSize,
            height: actualSize,
            borderRadius: actualSize / 2,
            backgroundColor: avatar.color,
          },
    [actualSize, avatar.color, isSquircle, theme],
  );

  return { styles, circleStyle, imageSize, avatar, theme };
};
