import { LaundryMapMarker } from 'components/LaundryMapMarker/LaundryMapMarker';
import { useQRScanHandler } from 'features/QRScanner/hooks/useQRScanHandler';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Config from 'react-native-config';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useLaundriesStore } from 'stores/useLaundriesStore';
import { useSelectedLaundry } from 'stores/useSelectedLaundry';

import { Camera, MapView, setAccessToken } from '@rnmapbox/maps';

import { WsStatusIndicator } from '../../components/WsStatusIndicator/WsStatusIndicator';
import { LaundryCard } from './components/LaundryCard/LaundryCard';
import { ScanFab } from './components/ScanFab/ScanFab';
import { useLaundriesTheme } from './theme/useLaundriesTheme';

setAccessToken(Config.MAPBOX_ACCESS_TOKEN || '');

const SPRING = { damping: 18, stiffness: 180, mass: 0.9 };

export const Laundries = () => {
  const { styles, fabBaseBottom, cardBottom } = useLaundriesTheme();
  const { selectedLaundryId, clearSelectedLaundry } = useSelectedLaundry();
  const laundries = useLaundriesStore(s => s.laundries);
  const connectionState = useLaundriesStore(s => s.connectionState);
  const { handleScan } = useQRScanHandler();

  const [cardHeight, setCardHeight] = useState(0);
  const fabBottom = useSharedValue(fabBaseBottom);

  const fabAnimatedStyle = useAnimatedStyle(() => ({
    bottom: fabBottom.value,
  }));

  useEffect(() => {
    if (!selectedLaundryId) {
      fabBottom.value = withSpring(fabBaseBottom, SPRING);
      setCardHeight(0);
    }
  }, [selectedLaundryId]);

  const handleCardLayout = (height: number) => {
    setCardHeight(height);
    fabBottom.value = withSpring(cardBottom + height + 8, SPRING);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <MapView
          style={styles.mapContainer}
          onPress={clearSelectedLaundry}
          styleURL="mapbox://styles/joralpablo/cmhmbja3z00ah01sh2suuflc2"
        >
          <Camera zoomLevel={12} centerCoordinate={[-56.1645, -34.9011]} />
          {laundries.map((laundry, index) => (
            <LaundryMapMarker
              laundry={laundry}
              key={`${laundry.id ?? 'idx'}-${index}`}
              uniqueId={`laundry-${laundry.id ?? `idx-${index}`}`}
            />
          ))}
        </MapView>
      </View>

      <View style={styles.wsOverlay} pointerEvents="none">
        <WsStatusIndicator state={connectionState} />
      </View>

      <Animated.View style={[styles.scanFab, fabAnimatedStyle]}>
        <ScanFab onPress={handleScan} />
      </Animated.View>

      {selectedLaundryId && <LaundryCard onLayout={handleCardLayout} />}
    </View>
  );
};
