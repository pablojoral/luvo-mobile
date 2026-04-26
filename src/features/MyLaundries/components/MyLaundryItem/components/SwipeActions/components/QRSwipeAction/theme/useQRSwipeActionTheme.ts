import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useQRSwipeActionTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    actionQR: {
      backgroundColor: theme.surfaceColor['surface-invert'],
      alignItems: 'center',
      justifyContent: 'center',
      width: theme.spacing['spacing-xxxl'] * 2,
      gap: theme.spacing['spacing-xxs'],
    },
  });

  return { styles, theme };
};
