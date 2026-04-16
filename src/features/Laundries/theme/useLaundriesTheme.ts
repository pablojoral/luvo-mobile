import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useLaundriesTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      flex: 1,
      backgroundColor: theme.surfaceColor['surface-invert'],
    },
    mapContainer: {
      flex: 1,
    },
    wsOverlay: {
      position: 'absolute',
      top: theme.topInset + theme.spacing['spacing-sm'],
      right: theme.spacing['spacing-md'],
    },
  });

  return { styles, theme };
};
