import { LaundryMapCard } from 'features/Laundries/components/LaundryMapCard/LaundryMapCard';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';

import { useLaundryCard } from './hooks/useLaundryCard';
import { useLaundryCardTheme } from './theme/useLaundryCardTheme';

const SPRING = { damping: 18, stiffness: 180, mass: 0.9 };

interface LaundryCardProps {
  onLayout?: (height: number) => void;
}

export const LaundryCard = ({ onLayout }: LaundryCardProps) => {
  const { styles } = useLaundryCardTheme();
  const { laundry, handleLayout, handlePress } = useLaundryCard({ onLayout });

  return (
    <Animated.View
      style={styles.container}
      entering={SlideInDown.springify().damping(SPRING.damping).stiffness(SPRING.stiffness).mass(SPRING.mass)}
      exiting={SlideOutDown.springify().damping(SPRING.damping).stiffness(SPRING.stiffness).mass(SPRING.mass)}
      onLayout={handleLayout}
    >
      {laundry && <LaundryMapCard laundry={laundry} onPress={handlePress} />}
    </Animated.View>
  );
};
