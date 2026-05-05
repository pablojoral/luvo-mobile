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
      paddingBottom: theme.navBarHeight + theme.spacing['spacing-xl'],
    },
    contentContainer: {
      flex: 1,
      backgroundColor: theme.surfaceColor['surface-invert'],
      borderTopLeftRadius: theme.cornerRad['corner-rad-xxl'],
      borderTopRightRadius: theme.cornerRad['corner-rad-xxl'],
    },
    menusContainer: {
      flex: 1,
      justifyContent: 'space-between',
      paddingHorizontal: theme.spacing['spacing-xl'],
      paddingTop: theme.spacing['spacing-lg'],
      paddingBottom: theme.navBarHeight + theme.spacing['spacing-xl'],
    },
  });

  return { styles, theme };
};
