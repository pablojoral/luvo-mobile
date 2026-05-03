import { useEffect } from 'react';
import { cancelAnimation, useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';

export const VIEWFINDER_SIZE = 240;
const SCAN_RANGE = VIEWFINDER_SIZE / 2 - 8;

export const useQRViewfinderAnimation = (isActive: boolean) => {
  const yPos = useSharedValue(-SCAN_RANGE);
  const opacity = useSharedValue(1);

  useEffect(() => {
    if (isActive) {
      yPos.value = -SCAN_RANGE;
      opacity.value = withTiming(1, { duration: 200 });
      yPos.value = withRepeat(
        withTiming(SCAN_RANGE, { duration: 2400, easing: Easing.inOut(Easing.ease) }),
        -1,
        true,
      );
    } else {
      cancelAnimation(yPos);
      opacity.value = withTiming(0, { duration: 200 });
    }
  }, [isActive, yPos, opacity]);

  const scanLineStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: yPos.value }],
    opacity: opacity.value,
  }));

  return { scanLineStyle };
};
