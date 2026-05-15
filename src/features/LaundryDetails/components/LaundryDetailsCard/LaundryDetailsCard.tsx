import { Button, ConcurrencyTag, LocationLabel, Text } from '@luvo/ui';
import { Laundry } from 'models/models';
import { StyleProp, View, ViewStyle } from 'react-native';

import { useLaundryDetailsCard } from './hooks/useLaundryDetailsCard';
import { useLaundryDetailsCardTheme } from './theme/useLaundryDetailsCardTheme';

interface LaundryDetailsCardProps {
  laundry: Laundry | null;
  style?: StyleProp<ViewStyle>;
}

export const LaundryDetailsCard = ({ laundry, style }: LaundryDetailsCardProps) => {
  const { styles } = useLaundryDetailsCardTheme();
  const { title, location, available, total, directionsLabel, concurrencyLabels, handleGetDirections } = useLaundryDetailsCard({ laundry });

  if (!laundry) return null;

  return (
    <View style={[styles.card, style]}>
      <Text fontSize="font-size-xl" fontWeight="semibold">{title}</Text>
      <View style={styles.addressRow}>
        {location ? <LocationLabel location={location} style={styles.addressFlex} /> : null}
        <Button variant="link" size="sm" label={directionsLabel} onPress={handleGetDirections} />
      </View>
      <ConcurrencyTag available={available} total={total} labels={concurrencyLabels} />
    </View>
  );
};
