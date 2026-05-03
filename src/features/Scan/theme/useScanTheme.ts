import { Dimensions, StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'theme/hooks/useTheme';
import type { ScanMode } from '../hooks/useScanScreen';

export const useScanTheme = (mode: ScanMode) => {
  const theme = useTheme();
  const { top } = useSafeAreaInsets();
  const { height, width } = Dimensions.get('window');
  const isQR = mode === 'qr';

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
    qrHeader: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      paddingHorizontal: theme.spacing['spacing-lg'],
      paddingTop: theme.spacing['spacing-sm'],
    },
    closeButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: theme.overlayColor.glassButton,
      alignItems: 'center',
      justifyContent: 'center',
    },
    toggleRow: {
      alignItems: 'center',
      paddingTop: theme.spacing['spacing-md'],
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
    manualSpacer: {
      height: top + theme.spacing['spacing-xl'],
    },
  });

  const containerStyle = useMemo(() => ({
    flex: 1,
    backgroundColor: isQR ? theme.surfaceColor['surface-dark'] : theme.surfaceColor['surface-primary'],
  }), [isQR, theme]);

  return { styles, containerStyle, theme };
};
