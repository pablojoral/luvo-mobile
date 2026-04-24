import { LaundryDetailsCard } from 'features/LaundryDetails/components/LaundryDetailsCard/LaundryDetailsCard';
import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';
import { useRef } from 'react';
import { LayoutChangeEvent } from 'react-native';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { useLaundriesStore } from 'stores/useLaundriesStore';
import { useSelectedLaundry } from 'stores/useSelectedLaundry';

import { useLaundryCardTheme } from './theme/useLaundryCardTheme';

const SPRING = { damping: 18, stiffness: 180, mass: 0.9 };

interface LaundryCardProps {
  onLayout?: (height: number) => void;
}

export const LaundryCard = ({ onLayout }: LaundryCardProps) => {
  const { styles } = useLaundryCardTheme();
  const navigation = useRootStackNavigation();
  const { selectedLaundryId } = useSelectedLaundry();
  const currentLaundry = useLaundriesStore(s => s.laundries.find(l => l.id === selectedLaundryId) ?? null);

  const laundryRef = useRef(currentLaundry);
  if (currentLaundry) laundryRef.current = currentLaundry;
  const laundry = laundryRef.current;

  const handleLayout = (e: LayoutChangeEvent) => onLayout?.(e.nativeEvent.layout.height);

  return (
    <Animated.View
      style={styles.container}
      entering={SlideInDown.springify().damping(SPRING.damping).stiffness(SPRING.stiffness).mass(SPRING.mass)}
      exiting={SlideOutDown.springify().damping(SPRING.damping).stiffness(SPRING.stiffness).mass(SPRING.mass)}
      onLayout={handleLayout}
    >
      <LaundryDetailsCard
        laundry={laundry}
        onToggle={laundry ? () => navigation.navigate('LaundryDetails', { laundryId: laundry.id }) : undefined}
      />
    </Animated.View>
  );
};
