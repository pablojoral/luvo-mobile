import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const usePaymentMachineCardTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    card: {
      backgroundColor: theme.surfaceColor['surface-secondary'],
      borderRadius: theme.cornerRad['corner-rad-lg'],
      padding: theme.spacing['spacing-md'],
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing['spacing-sm'],
    },
    info: {
      flex: 1,
      gap: theme.spacing['spacing-xxxs'],
    },
  });

  return { styles };
};
