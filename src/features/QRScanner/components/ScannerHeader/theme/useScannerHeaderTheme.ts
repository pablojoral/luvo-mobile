import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'theme/hooks/useTheme';
import type { FontColor } from 'theme/types/Theme';

export const useScannerHeaderTheme = (isQR: boolean) => {
  const theme = useTheme();
  const { top } = useSafeAreaInsets();

  const styles = StyleSheet.create({
    container: {
      paddingTop: top + theme.spacing['spacing-xs'],
      paddingHorizontal: theme.spacing['spacing-lg'],
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    toggleRow: {
      paddingTop: theme.spacing['spacing-md'],
      paddingHorizontal: theme.spacing['spacing-md'],
    },
    closeButtonDark: {
      backgroundColor: theme.overlayColor.glassButton,
    },
  });

  const closeButtonStyle = isQR ? styles.closeButtonDark : undefined;
  const iconColor: FontColor = isQR ? 'font-invert' : 'font-primary';

  return { styles, closeButtonStyle, iconColor, theme };
};
