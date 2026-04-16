import { useCallback, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';
import { useAnimatedStyle, useDerivedValue, useSharedValue, withSpring } from 'react-native-reanimated';

import { SelectorOption } from '../PillSelector';

interface UseAnimatedStylesParams {
  options: SelectorOption[];
  value: string;
  onChange: (value: string) => void;
}

export const useAnimatedStyles = ({ options, value, onChange }: UseAnimatedStylesParams) => {
  const [containerW, setContainerW] = useState(0);
  const index = Math.max(
    0,
    options.findIndex(o => o.value === value),
  );
  const segmentW = containerW > 0 ? containerW / options.length : 0;

  // translateX holds the current index (0, 1, 2...), multiplied by segmentW in the style
  const translateX = useSharedValue(index);
  const progress = useDerivedValue(() => translateX.value);

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withSpring(progress.value * segmentW) }],
  }));
  const segmentWidthStyle = { width: segmentW };

  const onLayout = (e: LayoutChangeEvent) => {
    setContainerW(e.nativeEvent.layout.width);
    translateX.value = index; // keep value as index, not pixels
  };

  const handlePress = useCallback(
    (i: number) => {
      translateX.value = withSpring(i);
      if (i !== index) onChange(options[i].value);
    },
    [index, options, onChange, translateX],
  );

  return {
    thumbStyle,
    segmentWidthStyle,
    onLayout,
    handlePress,
  };
};
