import { StyleSheet } from 'react-native';

export const useAvatarTheme = () => {
  const AVATAR_SIZE_DEFAULT = 56;
  const AVATAR_IMAGE_RATIO = 0.72;

  const styles = StyleSheet.create({
    circle: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return { styles, AVATAR_SIZE_DEFAULT, AVATAR_IMAGE_RATIO };
};
