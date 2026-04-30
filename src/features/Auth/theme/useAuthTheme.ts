import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useAuthTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    avoidingView: {
      flex: 1,
    },
    container: {
      flex: 1,
      backgroundColor: theme.surfaceColor['surface-primary'],
    },
    logoContainer: {
      alignItems: 'center',
      gap: theme.spacing['spacing-md'],
    },
    content: {
      flex: 1,
      padding: theme.spacing['spacing-xl'],
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
      paddingBottom: theme.spacing['spacing-max'],
      gap: theme.spacing['spacing-md'],
    },
    dividerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing['spacing-sm'],
    },
    dividerLine: {
      flex: 1,
      height: theme.borderWidth['border-width-xs'],
      backgroundColor: theme.borderColor['border-secondary'],
    },
    socialButtonsRow: {
      gap: theme.spacing['spacing-sm'],
    },
    modeToggleRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: theme.spacing['spacing-xxxs'],
    },
  });

  return { styles, theme };
};
