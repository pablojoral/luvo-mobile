import { laundryService } from 'services/api/services/LaundryService';

import { useQuery } from '@tanstack/react-query';

import { qk } from '../keys';
import { Laundry } from 'models/models';

export function useLaundriesList(filter?: { search?: string }) {
  return useQuery({
    queryKey: qk.laundries.list(filter),
    queryFn: () =>
      // Todo: remove the .then() once backend provides coordinates
      laundryService.list().then((items: Laundry[]): Laundry[] => {
        // Simulate adding coordinates if missing (for demo purposes)
        return items;
      }),
    select: items => items.sort((a, b) => a.name.localeCompare(b.name)), // example
  });
}
