import { useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import { useForm } from 'react-hook-form';

import { useMe, useUpdateProfile, useDeleteAccount } from 'query/Auth/useAuth';
import { sendPasswordReset, getLinkedProviders } from 'services/firebase/firebaseAuth';
import { useMessagesStore } from 'stores/useMessagesStore';
import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';

const PROVIDER_LABELS: Record<string, string> = {
  password:     'Correo electrónico',
  'google.com': 'Google',
  'apple.com':  'Apple',
  phone:        'Teléfono',
};

export type AccountFormValues = {
  name: string;
  avatarId: number;
};

export function useAccountScreen() {
  const { data: user } = useMe();
  const { mutateAsync: updateProfile, isPending: isSaving } = useUpdateProfile();
  const { mutate: deleteAccount, isPending: isDeleting } = useDeleteAccount();
  const addMessage = useMessagesStore(s => s.addMessage);
  const nav = useRootStackNavigation();
  const [pickerVisible, setPickerVisible] = useState(false);

  const { control, handleSubmit, reset, setValue, watch, formState: { isDirty, errors } } =
    useForm<AccountFormValues>({ defaultValues: { name: '', avatarId: 1 } });

  // Initialize form once user data arrives
  const initialized = useRef(false);
  useEffect(() => {
    if (user && !initialized.current) {
      initialized.current = true;
      reset({ name: user.name ?? '', avatarId: user.avatarId ?? 1 });
    }
  }, [user, reset]);

  // Auto-submit with 800 ms debounce whenever name or avatarId changes
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
          addMessage({ title: 'Error', body: 'No se pudo guardar el perfil. Intentá de nuevo.' });
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
        title: 'Correo enviado',
        body: `Te enviamos un enlace para restablecer tu contraseña a ${user.email}.`,
      });
    } catch {
      addMessage({ title: 'Error', body: 'No se pudo enviar el correo. Intentá de nuevo.' });
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Eliminar cuenta',
      '¿Estás seguro? Esta acción es irreversible. Se eliminarán todos tus datos.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () =>
            deleteAccount(undefined, {
              onSuccess: () => nav.navigate('Tabs'),
              onError: () =>
                addMessage({ title: 'Error', body: 'No se pudo eliminar la cuenta. Intentá de nuevo.' }),
            }),
        },
      ],
    );
  };

  const linkedProviders = getLinkedProviders().map(id => ({
    id,
    label: PROVIDER_LABELS[id] ?? id,
  }));

  return {
    control,
    errors,
    watchedAvatarId,
    pickerVisible,
    setPickerVisible,
    isDeleting,
    handleAvatarSelect,
    handlePasswordReset,
    handleDeleteAccount,
    linkedProviders,
  };
}
