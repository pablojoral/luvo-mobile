import { useQRScanHandler } from './useQRScanHandler';
import { useEffect, useState } from 'react';
import { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useLaundriesStore } from 'stores/useLaundriesStore';
import { useSelectedLaundry } from 'stores/useSelectedLaundry';
import { useLaundriesTheme } from '../theme/useLaundriesTheme';

const SPRING = { damping: 18, stiffness: 180, mass: 0.9 };
const CARD_EXIT_DURATION = 400;

export const useLaundriesScreen = () => {
  const { fabBaseBottom, cardBottom } = useLaundriesTheme();
  const { selectedLaundryId, clearSelectedLaundry } = useSelectedLaundry();
  const laundries = useLaundriesStore(s => s.laundries);
  const connectionState = useLaundriesStore(s => s.connectionState);
  const { handleScan } = useQRScanHandler();

  const [cardHeight, setCardHeight] = useState(0);
  const [showCard, setShowCard] = useState(false);
  const [cardKey, setCardKey] = useState<number | null>(null);
  const fabBottom = useSharedValue(fabBaseBottom);

  useEffect(() => {
    if (selectedLaundryId !== null) {
      setCardKey(selectedLaundryId);
      setShowCard(true);
    } else {
      setShowCard(false);
      fabBottom.value = withSpring(fabBaseBottom, SPRING);
      const timer = setTimeout(() => {
        setCardHeight(0);
      }, CARD_EXIT_DURATION);
      return () => clearTimeout(timer);
    }
  }, [selectedLaundryId, fabBaseBottom, fabBottom]);

  const handleCardLayout = (height: number) => {
    setCardHeight(height);
    fabBottom.value = withSpring(cardBottom + height + 8, SPRING);
  };

  const fabAnimatedStyle = useAnimatedStyle(() => ({
    bottom: fabBottom.value,
  }));

  return {
    laundries,
    connectionState,
    selectedLaundryId,
    showCard,
    cardKey,
    clearSelectedLaundry,
    cardHeight,
    fabAnimatedStyle,
    handleScan,
    handleCardLayout,
  };
};
