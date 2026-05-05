import { useCallback } from 'react';
import { useAuthRequired } from 'hooks/useAuthRequired';
import { useAddMyLaundry } from './useAddMyLaundry';
import { useMyLaundries } from './useMyLaundries';
import { useRemoveMyLaundry } from './useRemoveMyLaundry';

export function useMyLaundriesButton(laundryId: number) {
  const { data } = useMyLaundries();
  const { mutate: addLaundry, isPending: isAdding } = useAddMyLaundry();
  const { mutate: removeLaundry, isPending: isRemoving } = useRemoveMyLaundry();
  const { requireAuth, isAuthenticated } = useAuthRequired();

  const savedLaundry = data?.laundries.find(l => l.id === laundryId);
  const isSaved = !!savedLaundry;
  const isPrivate = savedLaundry?.visibility === 'private';
  const isPending = isAdding || isRemoving;

  const onPress = useCallback(() => {
    requireAuth(() => {
      if (isSaved && !isPrivate) {
        removeLaundry(laundryId);
      } else if (!isSaved) {
        addLaundry(laundryId);
      }
    })();
  }, [requireAuth, isSaved, isPrivate, laundryId, removeLaundry, addLaundry]);

  return {
    onPress,
    isSaved,
    isPending,
    disabled: isPrivate,
    color: isSaved ? 'font-highlight' : 'font-light',
    isAuthenticated,
  } as const;
}
