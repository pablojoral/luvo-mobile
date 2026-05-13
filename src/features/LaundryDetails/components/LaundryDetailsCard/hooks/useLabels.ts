import { Laundry } from 'models/models';
import { getAvailableMachines } from 'utils/Laundry/getAvailableMachines';
import { useLabelsStrings } from './useLabelsStrings';

export const useLabels = (laundry: Laundry | null) => {
  const { availabilityLabel, directionsLabel, concurrencyLabels } = useLabelsStrings();

  const title = laundry ? laundry.name : '';
  const location = laundry && laundry.location.address;

  const { available, total } = getAvailableMachines(laundry);

  return { title, location, availabilityLabel: availabilityLabel(available, total), directionsLabel, concurrencyLabels };
};
