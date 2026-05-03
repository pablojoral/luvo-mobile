import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useCodeSectionTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    description: {
      gap: theme.spacing['spacing-xs'],
    },
    scroll: {
      flex: 1,
    },
    inner: {
      flexGrow: 1,
      justifyContent: 'space-between',
      paddingHorizontal: theme.spacing['spacing-xl'],
      paddingTop: theme.spacing['spacing-xxxl'],
      paddingBottom: theme.bottomInset + theme.spacing['spacing-xl'],
    },
  });

  return { styles };
};
