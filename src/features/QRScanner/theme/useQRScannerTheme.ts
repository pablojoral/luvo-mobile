import { Dimensions, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'theme/hooks/useTheme';

export const useQRScannerTheme = () => {
  const theme = useTheme();
  const { top } = useSafeAreaInsets();
  const { height, width } = Dimensions.get('window');

  const styles = StyleSheet.create({
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width,
      height,
      zIndex: 9999,
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
      backgroundColor: 'rgba(0,0,0,0.6)',
    },
    targetContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    closeButton: {
      position: 'absolute',
      top: top + theme.spacing['spacing-md'],
      right: theme.spacing['spacing-xl'],
      padding: theme.spacing['spacing-sm'],
    },
  });

  return { styles, theme };
};
