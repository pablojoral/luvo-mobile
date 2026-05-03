import { Dimensions, StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';
import type { ScannerMode } from '../components/QRScannerContent/hooks/useQRScannerContent';

export const useQRScannerTheme = (mode: ScannerMode = 'qr') => {
  const theme = useTheme();
  const { height, width } = Dimensions.get('window');
  const isQR = mode === 'qr';

  const styles = StyleSheet.create({
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width,
      height,
      zIndex: theme.zIndex.overlay,
      backgroundColor: isQR ? theme.surfaceColor['surface-dark'] : theme.surfaceColor['surface-background'],
    },
    camera: {
      position: 'absolute',
      top: 0,
      left: 0,
      width,
      height,
    },
    dimmer: {
      position: 'absolute',
      top: 0,
      left: 0,
      width,
      height,
      backgroundColor: theme.overlayColor.dimmer,
    },
    codeCover: {
      position: 'absolute',
      top: 0,
      left: 0,
      width,
      height,
      backgroundColor: theme.surfaceColor['surface-background'],
    },
  });

  return { styles, theme };
};
