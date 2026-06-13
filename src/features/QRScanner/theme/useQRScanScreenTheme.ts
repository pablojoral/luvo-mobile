import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';
import type { ScannerMode } from '../components/QRScannerContent/hooks/useQRScannerContent';

export const useQRScanScreenTheme = (mode: ScannerMode = 'qr') => {
  const theme = useTheme();
  const isQR = mode === 'qr';

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingBottom: theme.navBarHeight,
      backgroundColor: isQR
        ? theme.surfaceColor['surface-dark']
        : theme.surfaceColor['surface-background'],
    },
    camera: StyleSheet.absoluteFillObject,
    dimmer: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: theme.overlayColor.dimmer,
    },
    codeCover: StyleSheet.absoluteFillObject,
    toggleRow: {
      paddingTop: theme.topInset + theme.spacing['spacing-lg'],
      paddingHorizontal: theme.spacing['spacing-md'],
      paddingBottom: theme.spacing['spacing-md'],
    },
  });

  return { styles };
};
