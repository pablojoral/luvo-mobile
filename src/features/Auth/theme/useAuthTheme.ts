import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useAuthTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.surfaceColor['surface-background'],
    },
    avoidingView: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
    },
    content: {
      padding: theme.spacing['spacing-xl'],
      gap: theme.spacing['spacing-md'],
    },
    logoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing['spacing-xs'],
      marginBottom: theme.spacing['spacing-sm'],
    },
    headingSection: {
      gap: theme.spacing['spacing-xs'],
      marginBottom: theme.spacing['spacing-xs'],
    },
    formSection: {
      gap: theme.spacing['spacing-md'],
    },
    errorText: {
      alignSelf: 'flex-start',
    },
    forgotPasswordRow: {
      alignSelf: 'flex-end',
    },
    forgotPasswordSuccessText: {
      alignSelf: 'flex-start',
    },
    footer: {
      padding: theme.spacing['spacing-xl'],
      paddingBottom: theme.spacing['spacing-xxxl'],
      gap: theme.spacing['spacing-md'],
    },
  });

  return { styles, theme };
};
