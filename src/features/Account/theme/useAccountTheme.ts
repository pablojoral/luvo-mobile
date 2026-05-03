import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useAccountTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.surfaceColor['surface-primary'],
    },
    body: {
      flex: 1,
      backgroundColor: theme.surfaceColor['surface-background'],
      borderTopLeftRadius: theme.cornerRad['corner-rad-xxl'],
      borderTopRightRadius: theme.cornerRad['corner-rad-xxl'],
    },
    scroll: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: theme.spacing['spacing-xl'],
      paddingTop: theme.spacing['spacing-lg'],
      paddingBottom: theme.bottomInset + theme.spacing['spacing-xl'],
      gap: theme.spacing['spacing-lg'],
    },
    deleteButton: {
      alignItems: 'center',
      paddingVertical: theme.spacing['spacing-md'],
      marginTop: theme.spacing['spacing-xl'],
    },
    deleteText: {
      textDecorationLine: 'underline' as const,
    },
  });

  return { styles, theme };
};
