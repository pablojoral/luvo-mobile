import { useQRScanHandler } from 'features/QRScanner/hooks/useQRScanHandler';
import { useEffect, useState } from 'react';
import { useSharedValue, withSpring } from 'react-native-reanimated';
import { useLaundriesStore } from 'stores/useLaundriesStore';
import { useSelectedLaundry } from 'stores/useSelectedLaundry';
import { useLaundriesTheme } from '../theme/useLaundriesTheme';

const SPRING = { damping: 18, stiffness: 180, mass: 0.9 };

export const useLaundriesScreen = () => {
  const { fabBaseBottom, cardBottom } = useLaundriesTheme();
  const { selectedLaundryId, clearSelectedLaundry } = useSelectedLaundry();
  const laundries = useLaundriesStore(s => s.laundries);
  const connectionState = useLaundriesStore(s => s.connectionState);
  const { handleScan } = useQRScanHandler();

  const [cardHeight, setCardHeight] = useState(0);
  const fabBottom = useSharedValue(fabBaseBottom);

  useEffect(() => {
    if (!selectedLaundryId) {
      fabBottom.value = withSpring(fabBaseBottom, SPRING);
      setCardHeight(0);
    }
  }, [selectedLaundryId, fabBaseBottom, fabBottom]);

  const handleCardLayout = (height: number) => {
    setCardHeight(height);
    fabBottom.value = withSpring(cardBottom + height + 8, SPRING);
  };

  return {
    laundries,
    connectionState,
    selectedLaundryId,
    clearSelectedLaundry,
    cardHeight,
    fabBottom,
    handleScan,
    handleCardLayout,
  };
};
