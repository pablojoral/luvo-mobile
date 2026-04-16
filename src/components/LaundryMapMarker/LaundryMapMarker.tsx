import { Laundry } from 'models/models';
import { Pressable, StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

import { MarkerView } from '@rnmapbox/maps';

import { PinSvg } from './components/PinSvg';
import { useLaundryMapMarker } from './hooks/useLaundryMapMarker';

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
  const theme = useTheme();
  const { ratio, coords, onPress, accessibilityLabel } = useLaundryMapMarker({ laundry, showAvailability });

  return (
    <MarkerView key={uniqueId} id={uniqueId} coordinate={coords}>
      <Pressable
        onPress={onPress}
        style={[styles.wrapper, { padding: theme.spacing['spacing-sm'], ...theme.shadowBox }]}
        accessible
        accessibilityLabel={accessibilityLabel}
      >
        <PinSvg ratio={ratio} size={size} />
      </Pressable>
    </MarkerView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});
