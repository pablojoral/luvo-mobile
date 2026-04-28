import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useRemoveSwipeActionTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    actionRemove: {
      backgroundColor: theme.surfaceColor['surface-error'],
      alignItems: 'center',
      justifyContent: 'center',
      width: theme.spacing['spacing-xxxl'] * 2,
      gap: theme.spacing['spacing-xxs'],
    },
  });

  return { styles, theme };
};
