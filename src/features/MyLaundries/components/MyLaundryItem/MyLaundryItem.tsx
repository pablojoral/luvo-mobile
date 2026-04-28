import React, { memo, useCallback } from 'react';
import { TouchableOpacity, View } from 'react-native';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

import { SvgIcon } from 'components/SvgIcon/SvgIcon';
import { Tag } from 'components/Tag/Tag';
import { Text } from 'components/Text/Text';
import { MyLaundry } from 'models/models';
import { useMyLaundriesTheme } from '../../theme/useMyLaundriesTheme';
import { QRSwipeAction, RemoveSwipeAction } from './components/SwipeActions/SwipeActions';
import { useMyLaundryItem } from './hooks/useMyLaundryItem';

interface MyLaundryItemProps {
  item: MyLaundry;
  onPress: () => void;
  onRemove: () => void;
  onShowQR: () => void;
}

export const MyLaundryItem = memo(({ item, onPress, onRemove, onShowQR }: MyLaundryItemProps) => {
  const { styles } = useMyLaundriesTheme();
  const { swipeableRef, location, machineLabel, privateTag, mainTag, handleQRPress, handleRemovePress } =
    useMyLaundryItem({ item, onRemove, onShowQR });

  const renderRightActions = useCallback(() => {
    if (item.visibility === 'private') {
      return <QRSwipeAction onPress={handleQRPress} />;
    }
    return <RemoveSwipeAction onPress={handleRemovePress} />;
  }, [item.visibility, handleQRPress, handleRemovePress]);

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
                {privateTag}
              </Tag>
            )}
            {item.isMain && (
              <Tag
                fontSize="font-size-xs"
                color="font-secondary"
                surfaceColor="surface-secondary"
              >
                {mainTag}
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
