import { Laundry } from 'models/models';
import { useMyLaundriesButton } from 'query/MyLaundries/useMyLaundriesButton';
import { useWindowDimensions } from 'react-native';
import { useLabels } from './useLabels';

interface UseLaundryDetailsCardProps {
  laundry: Laundry | null;
}

export const useLaundryDetailsCard = ({ laundry }: UseLaundryDetailsCardProps) => {
  const { width } = useWindowDimensions();
  const { title, location, availabilityLabel } = useLabels(laundry);
  const myLaundriesButton = useMyLaundriesButton(laundry?.id ?? 0);

  return { width, title, location, availabilityLabel, myLaundriesButton };
};
