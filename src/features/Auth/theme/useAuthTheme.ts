import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useAuthTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.surfaceColor['surface-primary'],
    },
    avoidingView: {
      flex: 1,
    },
    scrollViewContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: theme.spacing['spacing-xl'],
      paddingHorizontal: theme.spacing['spacing-xl'],
      paddingVertical: theme.spacing['spacing-xl'],
      paddingBottom: theme.spacing['spacing-max'],
    },
    formContainer: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      gap: theme.spacing['spacing-md'],
    },
    inputContainer: {
      width: '100%',
      gap: theme.spacing['spacing-md'],
    },
    headerContainer: {
      alignItems: 'center',
      gap: theme.spacing['spacing-md'],
    },
    errorText: {
      alignSelf: 'flex-start',
      marginBottom: theme.spacing['spacing-xs'],
    },
    menuContainer: {
      width: '100%',
      gap: theme.spacing['spacing-md'],
    },
    dividerContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing['spacing-sm'],
    },
    dividerLine: {
      flex: 1,
      height: theme.borderWidth['border-width-xs'],
      backgroundColor: theme.borderColor['border-primary'],
    },
  });

  return { styles };
};
