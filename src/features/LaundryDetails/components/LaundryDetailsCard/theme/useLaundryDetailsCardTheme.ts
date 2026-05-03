import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useLaundryDetailsCardTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    card: {
      backgroundColor: theme.surfaceColor['surface-primary'],
      borderRadius: theme.cornerRad['corner-rad-xl'],
      padding: theme.spacing['spacing-md'],
      gap: theme.spacing['spacing-xs'],
      ...theme.shadowCard,
    },
    addressRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing['spacing-xxs'],
    },
    addressText: {
      flex: 1,
      flexShrink: 1,
    },
  });

  return { styles, theme };
};
