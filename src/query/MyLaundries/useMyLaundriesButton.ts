import { useAddMyLaundry } from './useAddMyLaundry';
import { useMyLaundries } from './useMyLaundries';
import { useRemoveMyLaundry } from './useRemoveMyLaundry';

export function useMyLaundriesButton(laundryId: number) {
  const { data } = useMyLaundries();
  const { mutate: addLaundry, isPending: isAdding } = useAddMyLaundry();
  const { mutate: removeLaundry, isPending: isRemoving } = useRemoveMyLaundry();

  const savedLaundry = data?.laundries.find(l => l.id === laundryId);
  const isSaved = !!savedLaundry;
  const isPrivate = savedLaundry?.visibility === 'private';
  const isPending = isAdding || isRemoving;

  const onPress = () => {
    if (isSaved && !isPrivate) {
      removeLaundry(laundryId);
    } else if (!isSaved) {
      addLaundry(laundryId);
    }
  };

  return {
    onPress,
    isSaved,
    isPending,
    disabled: isPrivate,
    color: isSaved ? 'font-highlight' : 'font-light',
  } as const;
}
