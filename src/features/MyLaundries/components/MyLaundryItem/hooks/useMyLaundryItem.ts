import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { SwipeableMethods } from 'react-native-gesture-handler/ReanimatedSwipeable';
import { MyLaundry } from 'models/models';
import { QRSwipeAction, RemoveSwipeAction } from '../components/SwipeActions/SwipeActions';

interface UseMyLaundryItemProps {
  item: MyLaundry;
  onRemove: () => void;
  onShowQR: () => void;
}

export const useMyLaundryItem = ({ item, onRemove, onShowQR }: UseMyLaundryItemProps) => {
  const { t } = useTranslation('common');
  const swipeableRef = useRef<SwipeableMethods>(null);

  const location = [item.location.address, item.location.city]
    .filter(Boolean)
    .join(', ');

  const availableCount = item.machines.filter(m => m.status === 'available').length;
  const totalCount = item.machines.length;
  const machineLabel =
    totalCount === 0
      ? t('myLaundries.item.noMachines')
      : t('myLaundries.item.available', { available: availableCount, total: totalCount });

  const handleQRPress = useCallback(() => {
    swipeableRef.current?.close();
    onShowQR();
  }, [onShowQR]);

  const handleRemovePress = useCallback(() => {
    swipeableRef.current?.close();
    onRemove();
  }, [onRemove]);

  const privateTag = t('myLaundries.item.tags.private');
  const mainTag = t('myLaundries.item.tags.main');

  const renderRightActions = useCallback(() => {
    if (item.visibility === 'private') {
      return React.createElement(QRSwipeAction, { onPress: handleQRPress });
    }
    return React.createElement(RemoveSwipeAction, { onPress: handleRemovePress });
  }, [item.visibility, handleQRPress, handleRemovePress]);

  return { swipeableRef, location, machineLabel, privateTag, mainTag, renderRightActions };
};
