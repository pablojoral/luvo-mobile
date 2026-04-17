import { useMutation, useQueryClient } from '@tanstack/react-query';

import { myLaundriesService } from 'services/api/services/MyLaundriesService';
import { qk } from '../keys';

export function useAddMyLaundry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (laundryId: number) => myLaundriesService.add(laundryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: qk.myLaundries.root });
    },
  });
}
