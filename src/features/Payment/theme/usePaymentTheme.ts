import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const usePaymentTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.surfaceColor['surface-primary'],
    },
    scrollContent: {
      padding: theme.spacing['spacing-md'],
      paddingBottom: theme.bottomInset + theme.spacing['spacing-xl'],
      gap: theme.spacing['spacing-lg'],
    },
  });

  return { styles, theme };
};
