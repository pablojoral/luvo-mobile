import { SvgImage } from 'components/SvgImage/SvgImage';
import { Tag } from 'components/Tag/Tag';
import { TagButton } from 'components/TagButton/TagButton';
import { Text } from 'components/Text/Text';
import { Laundry } from 'models/models';
import { useMyLaundriesButton } from 'query/MyLaundries/useMyLaundriesButton';
import { Pressable, View, ViewProps } from 'react-native';

import { useLabels } from './hooks/useLabels';
import { useLaundryDetailsCardTheme } from './theme/useLaundryDetailsCardTheme';

interface LaundryDetailsCardProps extends ViewProps {
  laundry: Laundry | null;
  onToggle: () => void;
}

export const LaundryDetailsCard: React.FC<LaundryDetailsCardProps> = ({
  laundry,
  onToggle,
  ...props
}: LaundryDetailsCardProps) => {
  const { styles } = useLaundryDetailsCardTheme();
  const { title, location, availabilityLabel } = useLabels(laundry);
  const myLaundriesButton = useMyLaundriesButton(laundry?.id ?? 0);

  if (!laundry) {
    return null;
  }

  return (
    <View {...props}>
      {/* Drag indicator + text are tappable to toggle; buttons below are not */}
      <Pressable onPress={onToggle}>
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
              <View style={styles.tagsContainer}>
                <Tag fontSize={'font-size-sm'} color={'font-placeholder'}>
                  {availabilityLabel}
                </Tag>
                {laundry.visibility === 'public' && (
                  <TagButton
                    {...myLaundriesButton}
                    fontSize="font-size-sm"
                    iconName="Star"
                  />
                )}
              </View>
            </View>
          </View>
          <View style={styles.imageContainer}>
            <SvgImage name={'laundry-small'} height={112} width={112} />
          </View>
        </View>
      </Pressable>
    </View>
  );
};
