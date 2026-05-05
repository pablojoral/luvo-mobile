import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useErrorScreenTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: theme.topInset + theme.spacing['spacing-xl'],
      paddingBottom: theme.bottomInset + theme.spacing['spacing-xl'],
      paddingHorizontal: theme.spacing['spacing-xl'],
      backgroundColor: theme.surfaceColor['surface-background'],
    },
    content: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing['spacing-md'],
    },
  });

  return { styles, theme };
};
