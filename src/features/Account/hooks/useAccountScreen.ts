import { useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useMe, useUpdateProfile, useDeleteAccount } from 'query/Auth/useAuth';
import { sendPasswordReset, getLinkedProviders } from 'services/firebase/firebaseAuth';
import { useMessagesStore } from 'stores/useMessagesStore';
import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';

export type AccountFormValues = {
  name: string;
  avatarId: number;
};

export function useAccountScreen() {
  const { t } = useTranslation('common');
  const { data: user } = useMe();
  const { mutateAsync: updateProfile } = useUpdateProfile();
  const { mutate: deleteAccount, isPending: isDeleting } = useDeleteAccount();
  const addMessage = useMessagesStore(s => s.addMessage);
  const nav = useRootStackNavigation();
  const [pickerVisible, setPickerVisible] = useState(false);

  const providerLabels: Record<string, string> = {
    password:     t('account.providers.password'),
    'google.com': t('account.providers.google'),
    'apple.com':  t('account.providers.apple'),
    phone:        t('account.providers.phone'),
  };

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
          addMessage({ title: t('errors.generic'), body: t('account.messages.saveFailed') });
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
        title: t('account.messages.passwordResetSent'),
        body: t('account.messages.passwordResetSentBody', { email: user.email }),
      });
    } catch {
      addMessage({ title: t('errors.generic'), body: t('account.messages.passwordResetFailed') });
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      t('account.alerts.deleteConfirmTitle'),
      t('account.alerts.deleteConfirmBody'),
      [
        { text: t('account.alerts.deleteConfirmCancel'), style: 'cancel' },
        {
          text: t('account.alerts.deleteConfirmDelete'),
          style: 'destructive',
          onPress: () =>
            deleteAccount(undefined, {
              onSuccess: () => nav.navigate('Tabs'),
              onError: () =>
                addMessage({ title: t('errors.generic'), body: t('account.messages.deleteFailed') }),
            }),
        },
      ],
    );
  };

  const linkedProviders = getLinkedProviders().map(id => ({
    id,
    label: providerLabels[id] ?? id,
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
    strings: {
      screenTitle:         t('account.title'),
      profileSection:      t('account.profile.sectionTitle'),
      namePlaceholder:     t('account.profile.namePlaceholder'),
      nameRequired:        t('account.profile.nameRequired'),
      securitySection:     t('account.security.sectionTitle'),
      resetPassword:       t('account.security.resetPassword'),
      linkedSection:       t('account.linkedAccounts.sectionTitle'),
      linkedBadge:         t('account.linkedAccounts.linkedBadge'),
      deleteLabel:         t('account.deleteAccount.label'),
      deletingLabel:       t('account.deleteAccount.deleting'),
    },
  };
}
