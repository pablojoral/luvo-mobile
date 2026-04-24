import { Controller } from 'react-hook-form';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { ScreenHeader } from 'components/ScreenHeader/ScreenHeader';
import { Text } from 'components/Text/Text';
import { TextInput } from 'components/TextInput/TextInput';
import { SvgIcon } from 'components/SvgIcon/SvgIcon';
import { SettingsGroup } from 'features/Settings/components/SettingsGroup/SettingsGroup';
import { SettingsRow } from 'features/Settings/components/SettingsRow/SettingsRow';
import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';

import { Avatar } from './components/Avatar/Avatar';
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
    isDeleting,
    handleAvatarSelect,
    handlePasswordReset,
    handleDeleteAccount,
    linkedProviders,
  } = useAccountScreen();

  return (
    <View style={styles.container}>
      <ScreenHeader title="Mi cuenta" onBack={() => navigation.goBack()} />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <View style={styles.avatarSection}>
          <TouchableOpacity style={styles.avatarButton} onPress={() => setPickerVisible(true)} activeOpacity={0.8}>
            <Avatar avatarId={watchedAvatarId} size={96} />
            <View style={styles.editBadge}>
              <SvgIcon name="Edit" size="font-size-sm" color="font-invert" />
            </View>
          </TouchableOpacity>
        </View>

        <SettingsGroup title="Perfil">
          <View style={styles.nameRow}>
            <View style={styles.rowIcon}>
              <SvgIcon name="User" size="font-size-xl" color="font-secondary" />
            </View>
            <View style={styles.nameInputWrapper}>
              <Controller
                control={control}
                name="name"
                rules={{ required: true, minLength: 1 }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Tu nombre"
                    maxLength={50}
                    returnKeyType="done"
                    error={errors.name ? 'Nombre requerido' : undefined}
                    style={styles.nameInput}
                  />
                )}
              />
            </View>
          </View>
        </SettingsGroup>

        <SettingsGroup title="Seguridad">
          <SettingsRow
            type="value"
            icon="Settings"
            label="Restablecer contraseña"
            value=""
            onPress={handlePasswordReset}
          />
        </SettingsGroup>

        {linkedProviders.length > 0 ? (
          <SettingsGroup title="Cuentas vinculadas">
            {linkedProviders.map((p, i) => (
              <View key={p.id}>
                {i > 0 ? <View style={styles.separator} /> : null}
                <View style={styles.providerRow}>
                  <View style={styles.rowIcon}>
                    <SvgIcon name="User" size="font-size-xl" color="font-secondary" />
                  </View>
                  <Text fontSize="font-size-md" fontWeight="semibold" style={styles.providerLabel}>
                    {p.label}
                  </Text>
                  <View style={styles.vinculadaBadge}>
                    <Text fontSize="font-size-xs" style={styles.vinculadaText}>
                      Vinculada
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </SettingsGroup>
        ) : null}

        <TouchableOpacity
          style={styles.deleteRow}
          onPress={handleDeleteAccount}
          disabled={isDeleting}
          activeOpacity={0.7}
        >
          <View style={styles.deleteRowIcon}>
            <SvgIcon name="AlertTriangle" size="font-size-xl" color="font-error" />
          </View>
          <Text fontSize="font-size-md" color="font-error" fontWeight="semibold">
            {isDeleting ? 'Eliminando cuenta...' : 'Eliminar cuenta'}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <AvatarPicker
        visible={pickerVisible}
        currentId={watchedAvatarId}
        onSelect={handleAvatarSelect}
        onClose={() => setPickerVisible(false)}
      />
    </View>
  );
};
