import { Button } from 'components/Button/Button';
import { ConcurrencyTag } from 'components/ConcurrencyTag/ConcurrencyTag';
import { LocationLabel } from 'components/LocationLabel/LocationLabel';
import { Text } from 'components/Text/Text';
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
  const { title, location, available, total, directionsLabel, handleGetDirections } = useLaundryDetailsCard({ laundry });

  if (!laundry) return null;

  return (
    <View style={[styles.card, style]}>
      <Text fontSize="font-size-xl" fontWeight="semibold">{title}</Text>
      <View style={styles.addressRow}>
        {location ? <LocationLabel location={location} style={styles.addressFlex} /> : null}
        <Button variant="link" size="sm" label={directionsLabel} onPress={handleGetDirections} />
      </View>
      <ConcurrencyTag available={available} total={total} />
    </View>
  );
};
