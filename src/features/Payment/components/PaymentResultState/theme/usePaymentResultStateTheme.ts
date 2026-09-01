import { useMemo } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';
import type { PaymentResultVariant } from '../hooks/usePaymentResultState';

export const usePaymentResultStateTheme = (variant: PaymentResultVariant) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      paddingTop: theme.spacing['spacing-xxxl'],
      gap: theme.spacing['spacing-sm'],
    },
    title: {
      textAlign: 'center',
    },
    subtitle: {
      textAlign: 'center',
      paddingHorizontal: theme.spacing['spacing-xl'],
    },
    actionButton: {
      marginTop: theme.spacing['spacing-lg'],
      width: '100%',
    },
  });

  const iconBoxStyle: ViewStyle = useMemo(
    () => ({
      width: theme.spacing['spacing-xxxl'] + theme.spacing['spacing-xxl'],
      height: theme.spacing['spacing-xxxl'] + theme.spacing['spacing-xxl'],
      borderRadius: theme.cornerRad['corner-rad-full'],
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:
        variant === 'success'
          ? theme.surfaceColor['surface-success']
          : theme.surfaceColor['surface-error'],
    }),
    [variant, theme],
  );

  return { styles, iconBoxStyle };
};
