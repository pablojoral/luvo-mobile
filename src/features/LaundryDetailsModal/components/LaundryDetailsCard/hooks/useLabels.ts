import { Laundry } from 'models/models';
import { getAvailableMachines } from 'utils/Laundry/getAvailableMachines';

export const useLabels = (laundry: Laundry | null) => {
  const title = laundry ? laundry.name : '';
  const location = laundry && laundry.location.address;

  const { available, total } = getAvailableMachines(laundry);
  const availabilityLabel = `${available}/${total} Disponibles`;

  return { title, location, availabilityLabel };
};
