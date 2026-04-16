import { LaundryMapMarker } from 'components/LaundryMapMarker/LaundryMapMarker';
import React from 'react';
import { View } from 'react-native';

import { Camera, MapView, setAccessToken } from '@rnmapbox/maps';

import { useLaundriesTheme } from './theme/useLaundriesTheme';
import { useSelectedLaundry } from 'stores/useSelectedLaundry';
import { useLaundriesStore } from 'stores/useLaundriesStore';
import Config from 'react-native-config';

import { WsStatusIndicator } from '../../components/WsStatusIndicator/WsStatusIndicator';

setAccessToken(Config.MAPBOX_ACCESS_TOKEN || '');

export const Laundries = () => {
  const { styles } = useLaundriesTheme();

  const laundries = useLaundriesStore(s => s.laundries);
  const connectionState = useLaundriesStore(s => s.connectionState);
  const { clearSelectedLaundry } = useSelectedLaundry();

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

      {/* Live connection indicator */}
      <View style={styles.wsOverlay} pointerEvents="none">
        <WsStatusIndicator state={connectionState} />
      </View>
    </View>
  );
};
