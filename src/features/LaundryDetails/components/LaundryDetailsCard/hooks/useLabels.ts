import { Laundry } from 'models/models';
import { getAvailableMachines } from 'utils/Laundry/getAvailableMachines';
import { useTranslation } from 'react-i18next';

export const useLabels = (laundry: Laundry | null) => {
  const { t } = useTranslation('common');

  const title = laundry ? laundry.name : '';
  const location = laundry && laundry.location.address;

  const { available, total } = getAvailableMachines(laundry);
  const availabilityLabel = t('laundry.availability', { available, total });
  const directionsLabel = t('laundry.directions');

  return { title, location, availabilityLabel, directionsLabel };
};
