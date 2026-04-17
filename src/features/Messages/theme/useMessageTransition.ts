import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const SLIDE_OFFSET = 48;
const DURATION = 160;

export const useMessageTransition = (next: () => void, prev: () => void) => {
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);

  const animateTransition = (direction: 1 | -1, action: () => void) => {
    // Slide + fade out
    translateX.value = withTiming(-direction * SLIDE_OFFSET, { duration: DURATION });
    opacity.value = withTiming(0, { duration: DURATION });

    setTimeout(() => {
      action();
      // Place new content on the incoming side instantly, then slide in
      translateX.value = direction * SLIDE_OFFSET;
      translateX.value = withTiming(0, { duration: DURATION });
      opacity.value = withTiming(1, { duration: DURATION });
    }, DURATION);
  };

  const handleNext = () => animateTransition(1, next);
  const handlePrev = () => animateTransition(-1, prev);

  const contentAnimStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));

  return { handleNext, handlePrev, contentAnimStyle };
};
