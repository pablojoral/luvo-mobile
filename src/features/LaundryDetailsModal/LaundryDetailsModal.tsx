import React from 'react';
import { View } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { useSelectedLaundry } from 'stores/useSelectedLaundry';
import { useLaundriesStore } from 'stores/useLaundriesStore';

import { LaundryDetailsCard } from './components/LaundryDetailsCard/LaundryDetailsCard';
import { MachinesList } from './components/MachinesList/MachineList';
import { useAnimations } from './hooks/useAnimations';
import { useLaundryDetailsModalTheme } from './theme/useLaundryDetailsModalTheme';
import { SvgImage } from 'components/SvgImage/SvgImage';

export const LaundryDetailsModal: React.FC = () => {
  const { styles, width } = useLaundryDetailsModalTheme();

  const { selectedLaundryId, clearSelectedLaundry } = useSelectedLaundry();

  const laundry = useLaundriesStore(s => s.laundries.find(l => l.id === selectedLaundryId) ?? null);

  const { pan, toggle, containerAStyle, listAStyle } = useAnimations(!!laundry, clearSelectedLaundry);

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.container, containerAStyle]}>
        <View style={styles.backgroundImage}>
          <SvgImage name={'wave-laundry-card'} width={width} height={157} />
        </View>
        <LaundryDetailsCard laundry={laundry} onToggle={toggle} />

        <Animated.View style={[styles.listContainer, listAStyle]}>
          <MachinesList laundry={laundry} />
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};
