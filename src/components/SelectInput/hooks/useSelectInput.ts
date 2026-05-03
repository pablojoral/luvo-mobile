import { useCallback, useEffect, useState } from 'react';
import { SelectorOption } from 'components/PillSelector/PillSelector';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface Options {
  value: string;
  options: SelectorOption[];
  onChange: (value: string) => void;
}

export const useSelectInput = ({ value, options, onChange }: Options) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedLabel = options.find(o => o.value === value)?.label;

  const toggle = useCallback(() => setIsOpen(v => !v), []);

  const select = useCallback((val: string) => {
    onChange(val);
    setIsOpen(false);
  }, [onChange]);

  const rotation = useSharedValue(0);
  useEffect(() => {
    rotation.value = withTiming(isOpen ? 90 : 0, { duration: 180 });
  }, [isOpen, rotation]);

  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return { isOpen, toggle, select, selectedLabel, chevronStyle };
};
