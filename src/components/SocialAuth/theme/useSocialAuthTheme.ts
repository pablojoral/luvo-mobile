import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useSocialAuthTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
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
    buttonsRow: {
      gap: theme.spacing['spacing-sm'],
    },
  });

  return { styles, theme };
};
