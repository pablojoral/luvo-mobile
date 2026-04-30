import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { THUMB_TRAVEL } from '../theme/useSwitchTheme';

export const useSwitchAnimation = (value: boolean) => {
  const translateX = useRef(new Animated.Value(value ? THUMB_TRAVEL : 0)).current;
  const trackOpacity = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(translateX, {
        toValue: value ? THUMB_TRAVEL : 0,
        useNativeDriver: true,
        bounciness: 0,
      }),
      Animated.timing(trackOpacity, {
        toValue: value ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  }, [value, translateX, trackOpacity]);

  return { translateX, trackOpacity };
};
