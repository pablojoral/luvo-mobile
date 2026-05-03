import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { useFirebaseAuthState } from 'query/Auth/useAuth';
import { myLaundriesService } from 'services/api/services/MyLaundriesService';
import { qk } from '../keys';

export function useMyLaundries() {
  const { data: firebaseUser } = useFirebaseAuthState();
  const uid = firebaseUser?.uid ?? null;

  return useQuery({
    queryKey: qk.myLaundries.list(uid),
    queryFn: () => myLaundriesService.list(),
    staleTime: 30 * 1000,
    enabled: uid !== null,
    placeholderData: keepPreviousData,
  });
}
