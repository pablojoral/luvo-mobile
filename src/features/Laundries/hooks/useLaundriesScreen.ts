import { useEffect, useState } from 'react';
import { useLaundriesStore } from 'stores/useLaundriesStore';
import { useSelectedLaundry } from 'stores/useSelectedLaundry';
import { useMapLocation } from './useMapLocation';

export const useLaundriesScreen = () => {
  const { selectedLaundryId, setSelectedLaundryId, clearSelectedLaundry } = useSelectedLaundry();
  const laundries = useLaundriesStore(s => s.laundries);
  const connectionState = useLaundriesStore(s => s.connectionState);
  const { locationGranted } = useMapLocation();

  const [showCard, setShowCard] = useState(false);
  const [cardKey, setCardKey] = useState<number | null>(null);

  useEffect(() => {
    if (selectedLaundryId !== null) {
      setCardKey(selectedLaundryId);
      setShowCard(true);
    } else {
      setShowCard(false);
    }
  }, [selectedLaundryId]);

  return {
    laundries,
    connectionState,
    selectedLaundryId,
    setSelectedLaundryId,
    showCard,
    cardKey,
    clearSelectedLaundry,
    locationGranted,
  };
};
