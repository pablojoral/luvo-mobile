import { useMutation, useQueryClient } from '@tanstack/react-query';

import { myLaundriesService } from 'services/api/services/MyLaundriesService';
import { qk } from '../keys';

export function useRemoveMyLaundry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (laundryId: number) => myLaundriesService.remove(laundryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: qk.myLaundries.root });
    },
  });
}
