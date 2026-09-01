import { Dimensions, StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { useTheme } from 'theme/hooks/useTheme';

export const useScanTheme = () => {
  const theme = useTheme();
  const { height, width } = Dimensions.get('window');

  const styles = StyleSheet.create({
    camera: {
      position: 'absolute',
      top: 0,
      left: 0,
      width,
      height,
      zIndex: theme.zIndex.camera,
    },
    dimmer: {
      position: 'absolute',
      top: 0,
      left: 0,
      width,
      height,
      backgroundColor: theme.overlayColor.dimmer,
    },
    viewfinderRow: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    instructions: {
      position: 'absolute',
      bottom: theme.navBarHeight + theme.spacing['spacing-xl'],
      left: 0,
      right: 0,
      alignItems: 'center',
      paddingHorizontal: theme.spacing['spacing-xxxl'],
      gap: theme.spacing['spacing-xs'],
    },
  });

  const containerStyle = useMemo(() => ({
    flex: 1,
    backgroundColor: theme.surfaceColor['surface-dark'],
  }), [theme]);

  return { styles, containerStyle, theme };
};
