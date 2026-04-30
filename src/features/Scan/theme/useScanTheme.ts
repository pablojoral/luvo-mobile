import { Dimensions, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'theme/hooks/useTheme';


export const useScanTheme = () => {
  const theme = useTheme();
  const { top } = useSafeAreaInsets();

  const { height, width } = Dimensions.get('window');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      gap: theme.spacing['spacing-xxxxl'],
      padding: theme.spacing['spacing-xl'],
      paddingTop: top + theme.spacing['spacing-xxxxl'],
      paddingBottom: theme.navBarHeight + theme.spacing['spacing-xl'],
      // backgroundColor: theme.surfaceColor['surface-primary'],
    },
    background: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: width,
      height: height,
      zIndex: theme.zIndex.background,
      backgroundColor: theme.surfaceColor['surface-primary'],
    },
    camera: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: width,
      height: height,
      zIndex: theme.zIndex.camera,
    },
    qrContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return { styles, theme };
};
