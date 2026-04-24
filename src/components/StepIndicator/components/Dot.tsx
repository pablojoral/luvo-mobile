import Animated from 'react-native-reanimated';

import { useDotAnimation } from '../theme/useDotAnimation';

interface DotProps {
  active: boolean;
}

export const Dot = ({ active }: DotProps) => {
  const { dotStyle, animStyle, backgroundColor } = useDotAnimation(active);

  return <Animated.View style={[dotStyle, { backgroundColor }, animStyle]} />;
};
