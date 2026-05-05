import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useLoadErrorStateTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      gap: theme.spacing['spacing-md'],
      justifyContent: 'space-between',
      paddingHorizontal: theme.spacing['spacing-xl'],
    },
    contentContainer: {
      flex: 1,
      gap: theme.spacing['spacing-md'],
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return { styles };
};
