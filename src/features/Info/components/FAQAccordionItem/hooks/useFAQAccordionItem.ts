import { useRef, useState } from 'react';
import { Animated, LayoutChangeEvent } from 'react-native';

export const useFAQAccordionItem = () => {
  const [open, setOpen] = useState(false);
  const [bodyHeight, setBodyHeight] = useState(0);
  const rotation = useRef(new Animated.Value(0)).current;
  const heightAnim = useRef(new Animated.Value(0)).current;

  const onMeasure = (e: LayoutChangeEvent) => {
    const h = e.nativeEvent.layout.height;
    if (h > 0 && bodyHeight === 0) setBodyHeight(h);
  };

  const toggle = () => {
    Animated.parallel([
      Animated.timing(rotation, {
        toValue: open ? 0 : 1,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(heightAnim, {
        toValue: open ? 0 : bodyHeight,
        duration: 220,
        useNativeDriver: false,
      }),
    ]).start();
    setOpen(prev => !prev);
  };

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  return { heightAnim, rotate, toggle, bodyHeight, onMeasure };
};
