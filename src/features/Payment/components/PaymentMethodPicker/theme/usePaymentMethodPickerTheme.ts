import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const usePaymentMethodPickerTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      gap: theme.spacing['spacing-xs'],
    },
    confirmWrap: {
      paddingTop: theme.spacing['spacing-xl'],
    },
  });

  return { styles };
};
