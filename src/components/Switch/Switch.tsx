import { Animated, Pressable } from 'react-native';
import { useSwitchAnimation } from './hooks/useSwitchAnimation';
import { useSwitchTheme } from './theme/useSwitchTheme';

interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
}

export const Switch = ({ value, onValueChange, disabled = false }: SwitchProps) => {
  const { styles, trackStyle, thumbTravel } = useSwitchTheme(disabled);
  const { translateX, trackOpacity } = useSwitchAnimation(value, thumbTravel);

  return (
    <Pressable onPress={() => !disabled && onValueChange(!value)} style={trackStyle}>
      <Animated.View style={[styles.trackOverlay, { opacity: trackOpacity }]} />
      <Animated.View style={[styles.thumb, { transform: [{ translateX }] }]} />
    </Pressable>
  );
};
