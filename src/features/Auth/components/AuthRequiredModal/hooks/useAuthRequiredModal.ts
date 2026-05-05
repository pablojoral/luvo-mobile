import { useCallback } from 'react';
import { useAuthModalStore } from 'stores/useAuthModalStore';
import { useAuthRequiredStrings } from 'hooks/useAuthRequiredStrings';

export const useAuthRequiredModal = () => {
  const { visible, confirmHandler, hide } = useAuthModalStore();
  const strings = useAuthRequiredStrings();

  const handleConfirm = useCallback(() => {
    hide();
    confirmHandler?.();
  }, [hide, confirmHandler]);

  return { visible, strings, handleConfirm, handleCancel: hide };
};
