import { useCallback, useRef } from 'react';
import { SwipeableMethods } from 'react-native-gesture-handler/ReanimatedSwipeable';
import { MyLaundry } from 'models/models';

interface UseMyLaundryItemProps {
  item: MyLaundry;
  onRemove: () => void;
  onShowQR: () => void;
}

export const useMyLaundryItem = ({ item, onRemove, onShowQR }: UseMyLaundryItemProps) => {
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

  const handleQRPress = useCallback(() => {
    swipeableRef.current?.close();
    onShowQR();
  }, [onShowQR]);

  const handleRemovePress = useCallback(() => {
    swipeableRef.current?.close();
    onRemove();
  }, [onRemove]);

  return { swipeableRef, location, machineLabel, handleQRPress, handleRemovePress };
};
