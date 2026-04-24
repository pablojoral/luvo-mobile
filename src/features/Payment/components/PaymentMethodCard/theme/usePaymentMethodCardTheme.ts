import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

interface UsePaymentMethodCardThemeProps {
  selected: boolean;
  isAvailable: boolean;
}

export const usePaymentMethodCardTheme = ({ selected, isAvailable }: UsePaymentMethodCardThemeProps) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing['spacing-sm'],
    },
    iconWrap: {
      width: theme.spacing['spacing-xxxxl'],
      height: theme.spacing['spacing-xxxxl'],
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: theme.cornerRad['corner-rad-md'],
      backgroundColor: theme.surfaceColor['surface-secondary'],
    },
    textWrap: {
      flex: 1,
      gap: theme.spacing['spacing-xxxs'],
    },
    check: {
      width: theme.spacing['spacing-xxl'],
      height: theme.spacing['spacing-xxl'],
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: theme.cornerRad['corner-rad-full'],
      backgroundColor: theme.surfaceColor['surface-invert'],
    },
  });

  const cardStyle = useMemo(
    () => ({
      borderRadius: theme.cornerRad['corner-rad-lg'],
      padding: theme.spacing['spacing-md'],
      borderWidth: theme.borderWidth['border-width-sm'],
      borderColor: selected
        ? theme.surfaceColor['surface-invert']
        : theme.borderColor['border-secondary'],
      backgroundColor: selected
        ? theme.surfaceColor['surface-background']
        : theme.surfaceColor['surface-primary'],
      opacity: isAvailable ? 1 : 0.5,
    }),
    [selected, isAvailable, theme],
  );

  return { styles, cardStyle, theme };
};
