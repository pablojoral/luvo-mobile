import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useMonthHeaderTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      paddingTop: theme.spacing['spacing-lg'],
      paddingBottom: theme.spacing['spacing-xs'],
      paddingHorizontal: theme.spacing['spacing-xs'],
    },
    label: {
      letterSpacing: theme.letterSpacing.label,
    },
  });

  return { styles };
};
