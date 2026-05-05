import { useCallback, useEffect, useState } from 'react';
import { Easing, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { AVATARS } from 'features/Account/avatars';

const ENTER_MS = 320;
const HOLD_MS = 680;
const EXIT_MS = 180;

export const useLoader = () => {
  const [index, setIndex] = useState(0);
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  const nextAvatar = useCallback(() => {
    setIndex(i => (i + 1) % AVATARS.length);
  }, []);

  useEffect(() => {
    scale.value = 0;
    opacity.value = 0;

    scale.value = withTiming(1, { duration: ENTER_MS, easing: Easing.out(Easing.back(2.2)) });
    opacity.value = withTiming(1, { duration: 200 });

    const timer = setTimeout(() => {
      scale.value = withTiming(0.6, { duration: EXIT_MS });
      opacity.value = withTiming(0, { duration: EXIT_MS }, (finished) => {
        if (finished) runOnJS(nextAvatar)();
      });
    }, ENTER_MS + HOLD_MS);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return { avatar: AVATARS[index], animatedStyle };
};
