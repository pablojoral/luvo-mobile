import { View } from 'react-native';

import { Dot } from './components/Dot';
import { useStepIndicatorTheme } from './theme/useStepIndicatorTheme';

interface StepIndicatorProps {
  total: number;
  current: number;
}

export const StepIndicator = ({ total, current }: StepIndicatorProps) => {
  const { styles } = useStepIndicatorTheme();

  if (total <= 1) return null;

  return (
    <View style={styles.row}>
      {Array.from({ length: total }).map((_, i) => (
        <Dot key={i} active={i === current} />
      ))}
    </View>
  );
};
