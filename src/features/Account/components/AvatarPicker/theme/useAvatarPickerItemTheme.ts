import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';
import { Colors } from '@luvo/ui';

const CHECK_BADGE_SIZE = 18;

export const useAvatarPickerItemTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    avatarCell: {
      alignItems: 'center',
      paddingVertical: theme.spacing['spacing-md'],
      paddingHorizontal: theme.spacing['spacing-xxs'],
      borderRadius: theme.cornerRad['corner-rad-lg'],
      borderWidth: theme.borderWidth['border-width-md'],
      borderColor: 'transparent',
      position: 'relative',
    },
    checkBadge: {
      position: 'absolute',
      bottom: theme.spacing['spacing-sm'],
      right: theme.spacing['spacing-xs'],
      width: CHECK_BADGE_SIZE,
      height: CHECK_BADGE_SIZE,
      borderRadius: theme.cornerRad['corner-rad-full'],
      backgroundColor: Colors['colors-lavender-600'],
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return { styles, theme };
};
