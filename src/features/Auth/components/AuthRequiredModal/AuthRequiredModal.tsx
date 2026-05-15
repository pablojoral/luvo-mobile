import { ActionModal } from '@luvo/ui';
import { useAuthRequiredModal } from './hooks/useAuthRequiredModal';

export const AuthRequiredModal = () => {
  const { visible, strings, handleConfirm, handleCancel } = useAuthRequiredModal();

  return (
    <ActionModal
      visible={visible}
      title={strings.title}
      body={strings.body}
      confirmLabel={strings.continue}
      cancelLabel={strings.cancel}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      icon="User"
      variant="neutral"
    />
  );
};
