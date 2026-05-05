import { useLabels } from 'features/LaundryDetails/components/LaundryDetailsCard/hooks/useLabels';
import { Laundry } from 'models/models';
import { useMyLaundriesButton } from 'query/MyLaundries/useMyLaundriesButton';


interface UseLaundryMapCardProps {
  laundry: Laundry;
}

export const useLaundryMapCard = ({ laundry }: UseLaundryMapCardProps) => {
  const { title, location, availabilityLabel } = useLabels(laundry);
  const myLaundriesButton = useMyLaundriesButton(laundry.id);
  const showFavorite = laundry.visibility === 'public' && myLaundriesButton.isAuthenticated;

  return { title, location, availabilityLabel, myLaundriesButton, showFavorite };
};
