import { useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export const useBottomSheet = (visible: boolean) => {
  const { height } = useWindowDimensions();
  const [mounted, setMounted] = useState(visible);

  const opacity    = useSharedValue(0);
  const translateY = useSharedValue(height);

  useEffect(() => {
    if (visible) {
      setMounted(true);
      opacity.value    = withTiming(1,      { duration: 200 });
      translateY.value = withTiming(0,      { duration: 280 });
    } else {
      opacity.value    = withTiming(0,      { duration: 200 });
      translateY.value = withTiming(height, { duration: 280 }, (finished) => {
        if (finished) runOnJS(setMounted)(false);
      });
    }
  }, [visible, height, opacity, translateY]);

  const backdropStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));
  const sheetStyle    = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return { mounted, backdropStyle, sheetStyle };
};
