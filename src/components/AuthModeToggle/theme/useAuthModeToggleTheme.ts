import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useAuthModeToggleTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: theme.spacing['spacing-xxxs'],
    },
  });

  return { styles };
};
