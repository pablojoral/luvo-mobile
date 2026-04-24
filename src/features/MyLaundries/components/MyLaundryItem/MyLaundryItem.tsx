import React, { memo, useRef } from 'react';
import { TouchableOpacity, View } from 'react-native';
import ReanimatedSwipeable, { SwipeableMethods } from 'react-native-gesture-handler/ReanimatedSwipeable';

import { SvgIcon } from 'components/SvgIcon/SvgIcon';
import { Tag } from 'components/Tag/Tag';
import { Text } from 'components/Text/Text';
import { MyLaundry } from 'models/models';
import { useMyLaundriesTheme } from '../../theme/useMyLaundriesTheme';

interface MyLaundryItemProps {
  item: MyLaundry;
  onPress: () => void;
  onRemove: () => void;
  onShowQR: () => void;
}

export const MyLaundryItem = memo(({ item, onPress, onRemove, onShowQR }: MyLaundryItemProps) => {
  const { styles } = useMyLaundriesTheme();
  const swipeableRef = useRef<SwipeableMethods>(null);

  const location = [item.location.address, item.location.city]
    .filter(Boolean)
    .join(', ');

  const availableCount = item.machines.filter(m => m.status === 'available').length;
  const totalCount = item.machines.length;
  const machineLabel =
    totalCount === 0
      ? 'Sin máquinas'
      : `${availableCount} de ${totalCount} disponibles`;

  const renderRightActions = () => {
    if (item.visibility === 'private') {
      return (
        <TouchableOpacity
          style={styles.actionQR}
          onPress={() => {
            swipeableRef.current?.close();
            onShowQR();
          }}
          activeOpacity={0.8}
        >
          <SvgIcon name="QrCode" size="font-size-xl" color="font-invert" />
          <Text fontSize="font-size-xs" color="font-invert" fontWeight="semibold">
            Ver QR
          </Text>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        style={styles.actionRemove}
        onPress={() => {
          swipeableRef.current?.close();
          onRemove();
        }}
        activeOpacity={0.8}
      >
        <SvgIcon name="AlertCircle" size="font-size-xl" color="font-invert" />
        <Text fontSize="font-size-xs" color="font-invert" fontWeight="semibold">
          Eliminar
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <ReanimatedSwipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      overshootRight={false}
      friction={2}
    >
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

          {item.visibility === 'private' && item.accessCode ? (
            <View style={styles.itemCodeRow}>
              <SvgIcon name="QrCode" size="font-size-sm" color="font-placeholder" />
              <Text fontSize="font-size-sm" color="font-placeholder">
                {item.accessCode}
              </Text>
            </View>
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
    </ReanimatedSwipeable>
  );
});
