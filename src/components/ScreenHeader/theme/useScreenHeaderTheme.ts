import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useScreenHeaderTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: theme.spacing['spacing-sm'],
      paddingHorizontal: theme.spacing['spacing-md'],
      gap: theme.spacing['spacing-sm'],
      backgroundColor: theme.surfaceColor['surface-primary'],
    },
    titleGroup: {
      flex: 1,
      gap: theme.spacing['spacing-xxxs'],
    },
  });

  return { styles, theme };
};
