import { useMutation, useQueryClient } from '@tanstack/react-query';

import { myLaundriesService } from 'services/api/services/MyLaundriesService';
import { qk } from '../keys';

export function useRegisterMyLaundry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (code: string) => myLaundriesService.register(code),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: qk.myLaundries.root });
    },
  });
}
