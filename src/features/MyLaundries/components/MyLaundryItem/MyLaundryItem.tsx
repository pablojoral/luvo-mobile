import React, { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { SvgIcon } from 'components/SvgIcon/SvgIcon';
import { Tag } from 'components/Tag/Tag';
import { Text } from 'components/Text/Text';
import { MyLaundry } from 'models/models';
import { useMyLaundriesTheme } from '../../theme/useMyLaundriesTheme';

interface MyLaundryItemProps {
  item: MyLaundry;
  onPress: () => void;
}

export const MyLaundryItem = memo(({ item, onPress }: MyLaundryItemProps) => {
  const { styles } = useMyLaundriesTheme();

  const location = [item.location.address, item.location.city]
    .filter(Boolean)
    .join(', ');

  const availableCount = item.machines.filter(m => m.status === 'available').length;
  const totalCount = item.machines.length;
  const machineLabel =
    totalCount === 0
      ? 'Sin máquinas'
      : `${availableCount} de ${totalCount} disponibles`;

  return (
    <TouchableOpacity style={styles.item} onPress={onPress} activeOpacity={0.75}>
      <View style={styles.itemIcon}>
        <SvgIcon name="MapPin" size="font-size-xl" color="font-secondary" />
      </View>

      <View style={styles.itemContent}>
        <View style={styles.itemTitleRow}>
          <Text fontSize="font-size-md" fontWeight="semibold" color="font-primary">
            {item.name}
          </Text>
        </View>

        {location ? (
          <Text fontSize="font-size-sm" color="font-light" numberOfLines={1}>
            {location}
          </Text>
        ) : null}

        <View style={styles.itemTagsRow}>
          {item.visibility === 'private' && (
            <Tag
              fontSize="font-size-xs"
              color="font-invert"
              surfaceColor="surface-invert"
            >
              Privada
            </Tag>
          )}
          {item.isMain && (
            <Tag
              fontSize="font-size-xs"
              color="font-secondary"
              surfaceColor="surface-secondary"
            >
              Principal
            </Tag>
          )}
          <Tag fontSize="font-size-xs" color="font-light" surfaceColor="surface-background">
            {machineLabel}
          </Tag>
        </View>
      </View>

      <View style={styles.itemChevron}>
        <SvgIcon name="ChevronRight" size="font-size-xl" color="font-light" />
      </View>
    </TouchableOpacity>
  );
});
