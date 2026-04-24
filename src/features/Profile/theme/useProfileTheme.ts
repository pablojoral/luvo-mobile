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
      gap: theme.spacing['spacing-xxxxl'],
      paddingBottom: theme.navBarHeight + theme.spacing['spacing-xl'],
      backgroundColor: theme.surfaceColor['surface-invert'],
    },
    menusContainer: {
      flex: 1,
      justifyContent: 'space-between',
      paddingHorizontal: theme.spacing['spacing-xl'],
    },
  });

  return { styles };
};
