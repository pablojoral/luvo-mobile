import { useEffect } from 'react';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const FADE_MS = 220;

export const useMessagesOverlayAnimation = (visible: boolean, onDismiss: () => void) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) opacity.value = withTiming(1, { duration: FADE_MS });
  }, [visible, opacity]);

  const handleDismiss = () => {
    opacity.value = withTiming(0, { duration: FADE_MS });
    setTimeout(onDismiss, FADE_MS);
  };

  const overlayAnimStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return { overlayAnimStyle, handleDismiss };
};
