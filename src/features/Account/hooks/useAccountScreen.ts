import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAccountStrings } from './useAccountStrings';

import { useMe, useUpdateProfile, useDeleteAccount, useSignOut } from 'query/Auth/useAuth';
import { sendPasswordReset } from 'services/firebase/firebaseAuth';
import { useMessagesStore } from 'stores/useMessagesStore';
import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';
import { useLaundriesStore } from 'stores/useLaundriesStore';
import { useSelectedLaundry } from 'stores/useSelectedLaundry';

export type AccountFormValues = {
  name: string;
  avatarId: number;
};

export function useAccountScreen() {
  const { data: user } = useMe();
  const { mutateAsync: updateProfile } = useUpdateProfile();
  const { mutate: deleteAccount, isPending: isDeleting } = useDeleteAccount();
  const { mutate: signOut } = useSignOut();
  const strings = useAccountStrings(isDeleting);

  const addMessage = useMessagesStore(s => s.addMessage);
  const nav = useRootStackNavigation();
  const [pickerVisible, setPickerVisible] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmSignOut, setConfirmSignOut] = useState(false);

  const resetAppState = () => {
    useLaundriesStore.setState({ laundries: [], connectionState: 'idle' });
    useSelectedLaundry.setState({ selectedLaundryId: null });
    nav.reset({ index: 1, routes: [{ name: 'Tabs' }, { name: 'Auth' }] });
  };

  const { control, handleSubmit, reset, setValue, watch, formState: { isDirty, errors } } =
    useForm<AccountFormValues>({ defaultValues: { name: '', avatarId: 1 } });

  const initialized = useRef(false);
  useEffect(() => {
    if (user && !initialized.current) {
      initialized.current = true;
      reset({ name: user.name ?? '', avatarId: user.avatarId ?? 1 });
    }
  }, [user, reset]);

  const watchedName = watch('name');
  const watchedAvatarId = watch('avatarId');
  const isDirtyRef = useRef(isDirty);
  useEffect(() => { isDirtyRef.current = isDirty; }, [isDirty]);

  useEffect(() => {
    if (!isDirtyRef.current) return;
    const timer = setTimeout(() => {
      handleSubmit(async data => {
        try {
          await updateProfile({ name: data.name.trim(), avatarId: data.avatarId });
          reset(data);
        } catch {
          addMessage({ title: strings.genericError, body: strings.saveFailed });
        }
      })();
    }, 800);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedName, watchedAvatarId]);

  const handleAvatarSelect = (id: number) => {
    setValue('avatarId', id, { shouldDirty: true });
    setPickerVisible(false);
  };

  const handlePasswordReset = async () => {
    if (!user?.email) return;
    try {
      await sendPasswordReset(user.email);
      addMessage({
        title: strings.passwordResetSent,
        body: strings.passwordResetSentBody(user.email),
      });
    } catch {
      addMessage({ title: strings.genericError, body: strings.passwordResetFailed });
    }
  };

  const handleSignOut = () => {
    signOut(undefined, {
      onSuccess: resetAppState,
      onError: () =>
        addMessage({ title: strings.genericError, body: strings.signOutFailed }),
    });
  };

  const handleDeleteAccount = () => {
    deleteAccount(undefined, {
      onSuccess: resetAppState,
      onError: () =>
        addMessage({ title: strings.genericError, body: strings.deleteFailed }),
    });
  };

  const displayName = user?.name ?? user?.email ?? '';

  return {
    control,
    errors,
    watchedAvatarId,
    displayName,
    pickerVisible,
    openAvatarPicker:    () => setPickerVisible(true),
    closeAvatarPicker:   () => setPickerVisible(false),
    isDeleting,
    confirmDelete,
    setConfirmDelete,
    openConfirmDelete:   () => setConfirmDelete(true),
    cancelConfirmDelete: () => setConfirmDelete(false),
    confirmSignOut,
    setConfirmSignOut,
    openConfirmSignOut:  () => setConfirmSignOut(true),
    cancelConfirmSignOut: () => setConfirmSignOut(false),
    handleAvatarSelect,
    handlePasswordReset,
    handleSignOut,
    handleDeleteAccount,
    user,
    strings,
  };
}
