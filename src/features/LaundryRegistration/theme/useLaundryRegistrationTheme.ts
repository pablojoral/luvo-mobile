import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useLaundryRegistrationTheme = () => {
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
    },
    codeCard: {
      width: '100%',
      padding: theme.spacing['spacing-xl'],
      borderRadius: theme.cornerRad['corner-rad-xl'],
      backgroundColor: theme.surfaceColor['surface-background'],
      alignItems: 'center',
      gap: theme.spacing['spacing-sm'],
    },
    errorText: {
      textAlign: 'center',
    },
    guestContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing['spacing-lg'],
      paddingHorizontal: theme.spacing['spacing-xl'],
    },
  });

  return { styles, theme };
};
