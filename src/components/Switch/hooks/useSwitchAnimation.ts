import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export const useSwitchAnimation = (value: boolean, thumbTravel: number) => {
  const translateX = useRef(new Animated.Value(value ? thumbTravel : 0)).current;
  const trackOpacity = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(translateX, {
        toValue: value ? thumbTravel : 0,
        useNativeDriver: true,
        bounciness: 0,
      }),
      Animated.timing(trackOpacity, {
        toValue: value ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  }, [value, translateX, trackOpacity, thumbTravel]);

  return { translateX, trackOpacity };
};
