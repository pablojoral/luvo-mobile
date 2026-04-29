import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useProfileTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.surfaceColor['surface-primary'],
    },
    loadingContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    contentContainer: {
      flex: 1,
      paddingBottom: theme.navBarHeight + theme.spacing['spacing-xl'],
      backgroundColor: theme.surfaceColor['surface-background'],
    },
    menusContainer: {
      flex: 1,
      paddingHorizontal: theme.spacing['spacing-xl'],
      paddingTop: theme.spacing['spacing-lg'],
    },
  });

  return { styles, theme };
};
