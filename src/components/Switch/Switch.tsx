import { Switch as RNSwitch } from 'react-native';
import { useSwitchTheme } from './theme/useSwitchTheme';

interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
}

export const Switch = ({ value, onValueChange, disabled }: SwitchProps) => {
  const { trackColorFalse, trackColorTrue, thumbColor } = useSwitchTheme();

  return (
    <RNSwitch
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      trackColor={{ false: trackColorFalse, true: trackColorTrue }}
      thumbColor={thumbColor}
    />
  );
};
