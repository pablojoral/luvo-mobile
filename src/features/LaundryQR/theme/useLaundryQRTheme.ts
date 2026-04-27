import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useLaundryQRTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.surfaceColor['surface-primary'],
    },
    content: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing['spacing-lg'],
      paddingHorizontal: theme.spacing['spacing-xl'],
      // paddingBottom: theme.spacing['spacing-xxxxl'],
    },
    qrCard: {
      padding: theme.spacing['spacing-xl'],
      borderRadius: theme.cornerRad['corner-rad-xl'],
      backgroundColor: theme.surfaceColor['surface-primary'],
      ...theme.shadowCard,
    },
  });

  return { styles, theme };
};
