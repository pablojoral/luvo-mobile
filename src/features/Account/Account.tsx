import { Controller } from 'react-hook-form';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeScreenHeader } from 'components/SafeScreenHeader/SafeScreenHeader';
import { Text } from 'components/Text/Text';
import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';

import { ActionModal } from 'components/ActionModal/ActionModal';
import { AccountActionRow } from './components/AccountActionRow/AccountActionRow';
import { AccountDetailRow } from './components/AccountDetailRow/AccountDetailRow';
import { AccountEditableRow } from './components/AccountEditableRow/AccountEditableRow';
import { AccountIdentityCard } from './components/AccountIdentityCard/AccountIdentityCard';
import { AccountSectionLabel } from './components/AccountSectionLabel/AccountSectionLabel';
import { AvatarPicker } from './components/AvatarPicker/AvatarPicker';
import { useAccountScreen } from './hooks/useAccountScreen';
import { useAccountTheme } from './theme/useAccountTheme';

export const Account = () => {
  const navigation = useRootStackNavigation();
  const { styles } = useAccountTheme();
  const {
    control,
    errors,
    watchedAvatarId,
    pickerVisible,
    setPickerVisible,
    handleAvatarSelect,
    isDeleting,
    confirmDelete,
    setConfirmDelete,
    confirmSignOut,
    setConfirmSignOut,
    handlePasswordReset,
    handleDeleteAccount,
    signOut,
    user,
    strings,
  } = useAccountScreen();

  return (
    <View style={styles.container}>
      <SafeScreenHeader title={strings.screenTitle} onBack={() => navigation.goBack()} />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity onPress={() => setPickerVisible(true)} activeOpacity={0.8}>
          <AccountIdentityCard
            name={user?.name ?? user?.email ?? ''}
            avatarId={watchedAvatarId}
            clientLabel={strings.clientLabel}
          />
        </TouchableOpacity>

        <AccountSectionLabel title={strings.nameLabel} />
        <Controller
          control={control}
          name="name"
          rules={{ required: true, minLength: 1 }}
          render={({ field: { onChange, onBlur, value } }) => (
            <AccountEditableRow
              label={strings.nameLabel}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={strings.namePlaceholder}
              error={errors.name ? strings.nameRequired : undefined}
            />
          )}
        />
        <AccountDetailRow label={strings.emailLabel} value={user?.email ?? ''} />

        <AccountSectionLabel title={strings.securitySection} />
        <AccountActionRow
          icon="Settings"
          label={strings.resetPassword}
          onPress={handlePasswordReset}
        />

        <AccountSectionLabel title={strings.sessionSection} />
        <AccountActionRow
          icon="LogOut"
          label={strings.signOut}
          onPress={() => setConfirmSignOut(true)}
        />

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => setConfirmDelete(true)}
          disabled={isDeleting}
          activeOpacity={0.7}
        >
          <Text fontSize="font-size-sm" color="font-placeholder" style={styles.deleteText}>
            {isDeleting ? strings.deletingLabel : strings.deleteLabel}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <AvatarPicker
        visible={pickerVisible}
        currentId={watchedAvatarId}
        onSelect={handleAvatarSelect}
        onClose={() => setPickerVisible(false)}
      />

      <ActionModal
        visible={confirmDelete}
        title={strings.deleteConfirmTitle}
        body={strings.deleteConfirmBody}
        confirmLabel={strings.deleteConfirmDelete}
        cancelLabel={strings.deleteConfirmCancel}
        onConfirm={handleDeleteAccount}
        onCancel={() => setConfirmDelete(false)}
      />

      <ActionModal
        visible={confirmSignOut}
        variant="neutral"
        icon="LogOut"
        title={strings.signOutConfirmTitle}
        body={strings.signOutConfirmBody}
        confirmLabel={strings.signOutConfirmConfirm}
        cancelLabel={strings.signOutConfirmCancel}
        onConfirm={() => signOut()}
        onCancel={() => setConfirmSignOut(false)}
      />
    </View>
  );
};
