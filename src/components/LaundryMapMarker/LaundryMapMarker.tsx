import { Laundry } from 'models/models';
import { Pressable } from 'react-native';

import { MarkerView } from '@rnmapbox/maps';

import { PinSvg } from './components/PinSvg';
import { useLaundryMapMarker } from './hooks/useLaundryMapMarker';
import { useLaundryMapMarkerTheme } from './theme/useLaundryMapMarkerTheme';

interface LaundryMapMarkerProps {
  laundry: Laundry;
  uniqueId: string;
  size?: number;
  /** If true, fill represents availability; otherwise occupation */
  showAvailability?: boolean;
}

export const LaundryMapMarker = ({
  laundry,
  uniqueId,
  size = 40,
  showAvailability = false,
}: LaundryMapMarkerProps) => {
  const { wrapperStyle } = useLaundryMapMarkerTheme();
  const { ratio, coords, onPress, accessibilityLabel } = useLaundryMapMarker({ laundry, showAvailability });

  return (
    <MarkerView key={uniqueId} id={uniqueId} coordinate={coords}>
      <Pressable
        onPress={onPress}
        style={wrapperStyle}
        accessible
        accessibilityLabel={accessibilityLabel}
      >
        <PinSvg ratio={ratio} size={size} />
      </Pressable>
    </MarkerView>
  );
};
