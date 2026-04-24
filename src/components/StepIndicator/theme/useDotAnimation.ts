import { useEffect } from 'react';
import { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { useStepIndicatorTheme } from './useStepIndicatorTheme';

const SPRING = { damping: 16, stiffness: 200, mass: 0.6 };

export const useDotAnimation = (active: boolean) => {
  const { styles, dotSize, dotActiveWidth, dotColor, dotActiveColor } = useStepIndicatorTheme();

  const width = useSharedValue(active ? dotActiveWidth : dotSize);
  const opacity = useSharedValue(active ? 1 : 0.35);

  useEffect(() => {
    width.value = withSpring(active ? dotActiveWidth : dotSize, SPRING);
    opacity.value = withSpring(active ? 1 : 0.35, SPRING);
  }, [active, dotActiveWidth, dotSize, width, opacity]);

  const animStyle = useAnimatedStyle(() => ({
    width: width.value,
    opacity: opacity.value,
  }));

  return {
    dotStyle: styles.dot,
    animStyle,
    backgroundColor: active ? dotActiveColor : dotColor,
  };
};
