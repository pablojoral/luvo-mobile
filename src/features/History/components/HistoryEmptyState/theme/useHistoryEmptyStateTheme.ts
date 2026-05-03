import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useHistoryEmptyStateTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: theme.spacing['spacing-xl'],
    },
  });

  return { styles };
};
