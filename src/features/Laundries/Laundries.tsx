import { LaundryMapMarker } from 'components/LaundryMapMarker/LaundryMapMarker';
import React from 'react';
import { View } from 'react-native';
import Config from 'react-native-config';
import Animated from 'react-native-reanimated';

import { Camera, MapView, setAccessToken } from '@rnmapbox/maps';

import { WsStatusIndicator } from '../../components/WsStatusIndicator/WsStatusIndicator';
import { LaundryCard } from './components/LaundryCard/LaundryCard';
import { ScanFab } from './components/ScanFab/ScanFab';
import { useLaundriesScreen } from './hooks/useLaundriesScreen';
import { useLaundriesTheme } from './theme/useLaundriesTheme';

setAccessToken(Config.MAPBOX_ACCESS_TOKEN || '');

export const Laundries = () => {
  const { styles } = useLaundriesTheme();
  const {
    laundries,
    connectionState,
    selectedLaundryId,
    clearSelectedLaundry,
    fabAnimatedStyle,
    handleScan,
    handleCardLayout,
  } = useLaundriesScreen();

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
