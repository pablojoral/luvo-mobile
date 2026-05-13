import { IconButton, LocationLabel, SvgImage, Tag, Text } from '@luvo/ui';
import { Laundry } from 'models/models';
import { TouchableOpacity, View } from 'react-native';

import { useLaundryMapCard } from './hooks/useLaundryMapCard';
import { useLaundryMapCardTheme } from './theme/useLaundryMapCardTheme';

interface LaundryMapCardProps {
  laundry: Laundry;
  onPress: () => void;
}

export const LaundryMapCard = ({ laundry, onPress }: LaundryMapCardProps) => {
  const { styles } = useLaundryMapCardTheme();
  const { title, location, availabilityLabel, myLaundriesButton, showFavorite } = useLaundryMapCard({ laundry });

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.info}>
        <Text fontSize="font-size-lg" fontWeight="bold">
          {title}
        </Text>
        {location ? <LocationLabel location={location} /> : null}
        <View style={styles.availabilityRow}>
          <Tag surfaceColor="surface-surface" fontWeight="semibold" fontSize="font-size-sm">
            {availabilityLabel}
          </Tag>
          {showFavorite && (
            <IconButton
              iconName="Star"
              iconSize="icon-size-lg"
              iconColor={myLaundriesButton.color}
              onPress={myLaundriesButton.onPress}
              disabled={myLaundriesButton.disabled || myLaundriesButton.isPending}
            />
          )}
        </View>
      </View>
      <View style={styles.image}>
        <SvgImage name="laundry-small" height={112} width={112} />
      </View>
    </TouchableOpacity>
  );
};
