import { SvgImage } from 'components/SvgImage/SvgImage';
import { Tag } from 'components/Tag/Tag';
import { Text } from 'components/Text/Text';
import { Laundry } from 'models/models';
import { View, ViewProps } from 'react-native';

import { useLabels } from './hooks/useLabels';
import { useLaundryDetailsCardTheme } from './theme/useLaundryDetailsCardTheme';

interface LaundryDetailsCardProps extends ViewProps {
  laundry: Laundry | null;
}

export const LaundryDetailsCard: React.FC<LaundryDetailsCardProps> = ({
  laundry,
  ...props
}: LaundryDetailsCardProps) => {
  const { styles } = useLaundryDetailsCardTheme();
  const { title, location, availabilityLabel } = useLabels(laundry);

  if (!laundry) {
    return null;
  }

  return (
    <View {...props}>
      <View style={styles.dragIndicatorContainer}>
        <View style={styles.dragIndicator} />
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.infoContainer}>
          <View style={styles.infoContentContainer}>
            <View style={styles.textContainer}>
              <Text fontSize={'font-size-lg'}>{title}</Text>
              <Text fontSize={'font-size-sm'} color={'font-placeholder'}>
                {location}
              </Text>
            </View>
            <Tag fontSize={'font-size-sm'} color={'font-placeholder'}>
              {availabilityLabel}
            </Tag>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <SvgImage name={'laundry-small'} height={112} width={112} />
        </View>
      </View>
    </View>
  );
};
