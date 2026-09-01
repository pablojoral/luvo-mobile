import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const usePaymentLoadingStateTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      paddingTop: theme.spacing['spacing-xxxl'],
      gap: theme.spacing['spacing-sm'],
    },
    message: {
      textAlign: 'center',
    },
  });

  return { styles };
};
