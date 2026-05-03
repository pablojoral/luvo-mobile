import { Button } from 'components/Button/Button';
import { ConcurrencyTag } from 'components/ConcurrencyTag/ConcurrencyTag';
import { SvgIcon } from 'components/SvgIcon/SvgIcon';
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
        <SvgIcon name="MapPin" size="icon-size-sm" color="font-placeholder" />
        <Text fontSize="font-size-sm" color="font-placeholder" style={styles.addressText} numberOfLines={1}>
          {location}
        </Text>
        <Button variant="link" size="sm" label={directionsLabel} onPress={handleGetDirections} />
      </View>
      <ConcurrencyTag available={available} total={total} />
    </View>
  );
};
