import { useCallback } from 'react';
import { Linking, Platform } from 'react-native';
import { Laundry } from 'models/models';
import { getAvailableMachines } from 'utils/Laundry/getAvailableMachines';
import { useLabels } from './useLabels';

interface UseLaundryDetailsCardProps {
  laundry: Laundry | null;
}

export const useLaundryDetailsCard = ({ laundry }: UseLaundryDetailsCardProps) => {
  const { title, location, directionsLabel, concurrencyLabels } = useLabels(laundry);
  const { available, total } = getAvailableMachines(laundry);

  const handleGetDirections = useCallback(() => {
    const { latitude, longitude, address } = laundry?.location ?? {};
    if (!latitude || !longitude) return;
    const encoded = encodeURIComponent(address ?? `${latitude},${longitude}`);
    const url = Platform.OS === 'ios'
      ? `maps:?q=${encoded}&ll=${latitude},${longitude}`
      : `geo:${latitude},${longitude}?q=${encoded}`;
    Linking.openURL(url).catch(() =>
      Linking.openURL(`https://maps.google.com/?q=${latitude},${longitude}`),
    );
  }, [laundry]);

  return { title, location, available, total, directionsLabel, concurrencyLabels, handleGetDirections };
};
