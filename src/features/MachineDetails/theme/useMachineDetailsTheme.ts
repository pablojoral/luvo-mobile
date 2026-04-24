import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useMachineDetailsTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.surfaceColor['surface-primary'],
    },
    content: {
      flex: 1,
      paddingHorizontal: theme.spacing['spacing-xl'],
      paddingTop: theme.spacing['spacing-xl'],
      gap: theme.spacing['spacing-lg'],
    },
    card: {
      padding: theme.spacing['spacing-xl'],
      borderRadius: theme.cornerRad['corner-rad-xl'],
      backgroundColor: theme.surfaceColor['surface-background'],
      gap: theme.spacing['spacing-md'],
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing['spacing-sm'],
    },
    actions: {
      gap: theme.spacing['spacing-sm'],
      paddingBottom: theme.spacing['spacing-xl'],
    },
    notFound: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: theme.spacing['spacing-xl'],
      gap: theme.spacing['spacing-md'],
    },
    notFoundText: {
      textAlign: 'center',
    },
  });

  return { styles, theme };
};
