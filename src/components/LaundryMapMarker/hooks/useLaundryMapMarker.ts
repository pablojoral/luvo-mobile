import { Laundry } from 'models/models';
import { useSelectedLaundry } from 'stores/useSelectedLaundry';
import { getAvailableMachines } from 'utils/Laundry/getAvailableMachines';

interface Options {
  laundry: Laundry;
  showAvailability: boolean;
}

export const useLaundryMapMarker = ({ laundry, showAvailability }: Options) => {
  const { setSelectedLaundryId } = useSelectedLaundry();
  const { total, available, occupied } = getAvailableMachines(laundry);

  const value = showAvailability ? available : occupied;
  const ratio = total > 0 ? value / total : 0;

  const toNumber = (x: string | null) => (x ? parseFloat(x) : 0);
  const coords: [number, number] = [
    toNumber(laundry.location.longitude),
    toNumber(laundry.location.latitude),
  ];

  const onPress = () => setSelectedLaundryId(laundry.id);

  const accessibilityLabel = `Laundry ${showAvailability ? 'availability' : 'occupation'} ${value} of ${total}`;

  return { ratio, coords, onPress, accessibilityLabel };
};
