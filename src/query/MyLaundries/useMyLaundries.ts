import { useQuery } from '@tanstack/react-query';

import { myLaundriesService } from 'services/api/services/MyLaundriesService';
import { qk } from '../keys';

export function useMyLaundries() {
  return useQuery({
    queryKey: qk.myLaundries.list(),
    queryFn: () => myLaundriesService.list(),
    staleTime: 30 * 1000,
  });
}
