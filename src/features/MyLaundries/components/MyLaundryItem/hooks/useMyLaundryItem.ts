import React, { useCallback, useRef } from 'react';
import { SwipeableMethods } from 'react-native-gesture-handler/ReanimatedSwipeable';
import { MyLaundry } from 'models/models';
import { QRSwipeAction, RemoveSwipeAction } from '../components/SwipeActions/SwipeActions';
import { useMyLaundryItemStrings } from './useMyLaundryItemStrings';

interface UseMyLaundryItemProps {
  item: MyLaundry;
  onRemove: () => void;
  onShowQR: () => void;
}

export const useMyLaundryItem = ({ item, onRemove, onShowQR }: UseMyLaundryItemProps) => {
  const { noMachines, available, privateTag, mainTag } = useMyLaundryItemStrings();
  const swipeableRef = useRef<SwipeableMethods>(null);

  const location = [item.location.address, item.location.city]
    .filter(Boolean)
    .join(', ');

  const availableCount = item.machines.filter(m => m.status === 'available').length;
  const totalCount = item.machines.length;
  const machineLabel =
    totalCount === 0
      ? noMachines
      : available(availableCount, totalCount);

  const handleQRPress = useCallback(() => {
    swipeableRef.current?.close();
    onShowQR();
  }, [onShowQR]);

  const handleRemovePress = useCallback(() => {
    swipeableRef.current?.close();
    onRemove();
  }, [onRemove]);

  const renderRightActions = useCallback(() => {
    if (item.visibility === 'private') {
      return React.createElement(QRSwipeAction, { onPress: handleQRPress });
    }
    return React.createElement(RemoveSwipeAction, { onPress: handleRemovePress });
  }, [item.visibility, handleQRPress, handleRemovePress]);

  return { swipeableRef, location, machineLabel, privateTag, mainTag, renderRightActions };
};
