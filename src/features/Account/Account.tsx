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
    displayName,
    pickerVisible,
    openAvatarPicker,
    closeAvatarPicker,
    isDeleting,
    confirmDelete,
    openConfirmDelete,
    cancelConfirmDelete,
    confirmSignOut,
    openConfirmSignOut,
    cancelConfirmSignOut,
    handleAvatarSelect,
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
        <TouchableOpacity onPress={openAvatarPicker} activeOpacity={0.8}>
          <AccountIdentityCard
            name={displayName}
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
          onPress={openConfirmSignOut}
        />

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={openConfirmDelete}
          disabled={isDeleting}
          activeOpacity={0.7}
        >
          <Text fontSize="font-size-sm" color="font-placeholder" style={styles.deleteText}>
            {strings.deleteButtonLabel}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <AvatarPicker
        visible={pickerVisible}
        currentId={watchedAvatarId}
        onSelect={handleAvatarSelect}
        onClose={closeAvatarPicker}
      />

      <ActionModal
        visible={confirmDelete}
        title={strings.deleteConfirmTitle}
        body={strings.deleteConfirmBody}
        confirmLabel={strings.deleteConfirmDelete}
        cancelLabel={strings.deleteConfirmCancel}
        onConfirm={handleDeleteAccount}
        onCancel={cancelConfirmDelete}
      />

      <ActionModal
        visible={confirmSignOut}
        variant="neutral"
        icon="LogOut"
        title={strings.signOutConfirmTitle}
        body={strings.signOutConfirmBody}
        confirmLabel={strings.signOutConfirmConfirm}
        cancelLabel={strings.signOutConfirmCancel}
        onConfirm={signOut}
        onCancel={cancelConfirmSignOut}
      />
    </View>
  );
};
