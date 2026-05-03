import Animated from 'react-native-reanimated';
import { View } from 'react-native';
import { Defs, LinearGradient, Rect, Stop, Svg } from 'react-native-svg';
import { useQRViewfinderAnimation } from './hooks/useQRViewfinderAnimation';
import { useQRViewfinderTheme } from './theme/useQRViewfinderTheme';

interface QRViewfinderProps {
  isActive?: boolean;
}

export const QRViewfinder = ({ isActive = true }: QRViewfinderProps) => {
  const { styles, accentColor } = useQRViewfinderTheme();
  const { scanLineStyle } = useQRViewfinderAnimation(isActive);

  return (
    <View style={styles.viewfinder}>
      <View style={[styles.corner, styles.cornerTL]} />
      <View style={[styles.corner, styles.cornerTR]} />
      <View style={[styles.corner, styles.cornerBL]} />
      <View style={[styles.corner, styles.cornerBR]} />
      <Animated.View style={[styles.scanLine, scanLineStyle]}>
        <Svg width="100%" height={2}>
          <Defs>
            <LinearGradient id="scanGrad" x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0" stopColor={accentColor} stopOpacity="0" />
              <Stop offset="0.2" stopColor={accentColor} stopOpacity="0.85" />
              <Stop offset="0.8" stopColor={accentColor} stopOpacity="0.85" />
              <Stop offset="1" stopColor={accentColor} stopOpacity="0" />
            </LinearGradient>
          </Defs>
          <Rect x="0" y="0" width="100%" height={2} fill="url(#scanGrad)" />
        </Svg>
      </Animated.View>
    </View>
  );
};
