import { Button } from 'components/Button/Button';
import { ScreenHeader } from 'components/ScreenHeader/ScreenHeader';
import { SelectInput } from 'components/SelectInput/SelectInput';
import { SvgIcon } from 'components/SvgIcon/SvgIcon';
import { Text } from 'components/Text/Text';
import { TextInput } from 'components/TextInput/TextInput';
import { QRScanner } from 'features/QRScanner/QRScanner';
import { RootStackParamList } from 'navigation/RootStackNavigator';
import { Controller } from 'react-hook-form';
import { Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useReportForm } from './hooks/useReportForm';
import { useReportTheme } from './theme/useReportTheme';

type Props = NativeStackScreenProps<RootStackParamList, 'Report'>;

export const Report = ({ route, navigation }: Props) => {
  const { laundryId, machineId } = route.params ?? {};
  const { styles } = useReportTheme();
  const {
    control,
    errors,
    isSubmitting,
    onSubmit,
    selectedEntity,
    subjectOptions,
    onScanForEntity,
    onClearEntity,
    strings,
  } = useReportForm({
    laundryId,
    machineId,
    onSuccess: () => navigation.goBack(),
  });

  const entityName =
    selectedEntity?.type === 'machine'
      ? `${selectedEntity.machine.name} — ${selectedEntity.laundry.name}`
      : selectedEntity?.laundry.name;

  const entityIconName =
    selectedEntity?.type === 'machine' && selectedEntity.machine.type === 'dryer'
      ? 'Wind'
      : selectedEntity?.type === 'machine'
      ? 'Droplet'
      : 'MapPin';

  return (
    <View style={styles.container}>
      <QRScanner override />
      <ScreenHeader title={strings.title} onBack={() => navigation.goBack()} />
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView bounces={false} keyboardShouldPersistTaps="handled">
          <Pressable onPress={Keyboard.dismiss} style={styles.content}>

            {/* Entity selection */}
            <View>
              <Text fontSize="font-size-sm" color="font-secondary" style={styles.sectionLabel}>
                {strings.entitySectionLabel}
              </Text>
              {selectedEntity === null ? (
                <Pressable style={styles.scanButton} onPress={onScanForEntity}>
                  <SvgIcon name="QrCode" size="icon-size-md" color="font-secondary" />
                  <Text fontSize="font-size-sm" color="font-secondary">
                    {strings.entitySectionScan}
                  </Text>
                </Pressable>
              ) : (
                <View style={styles.entityCard}>
                  <SvgIcon name={entityIconName} size="icon-size-sm" color="font-secondary" />
                  <View style={styles.entityCardInfo}>
                    <Text fontSize="font-size-xs" color="font-secondary">
                      {strings.entityTypeLabel(selectedEntity.type)}
                    </Text>
                    <Text fontSize="font-size-sm" fontWeight="semibold">
                      {entityName}
                    </Text>
                  </View>
                  <Pressable style={styles.clearButton} onPress={onClearEntity} hitSlop={8}>
                    <Text fontSize="font-size-lg" color="font-secondary">×</Text>
                  </Pressable>
                </View>
              )}
            </View>

            {/* Subject dropdown */}
            <Controller
              control={control}
              name="subject"
              rules={{ required: strings.subjectRequired }}
              render={({ field: { onChange, value } }) => (
                <SelectInput
                  label={strings.subjectLabel}
                  placeholder={strings.subjectPlaceholder}
                  value={value}
                  options={subjectOptions}
                  onChange={onChange}
                  error={errors.subject?.message}
                />
              )}
            />

            {/* Description */}
            <Controller
              control={control}
              name="description"
              rules={{ required: strings.descriptionRequired }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label={strings.descriptionLabel}
                  placeholder={strings.descriptionPlaceholder}
                  multiline
                  maxLength={2000}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.description?.message}
                  style={styles.descriptionInput}
                />
              )}
            />

            {errors.root && (
              <Text fontSize="font-size-xs" color="font-error" style={styles.errorText}>
                {errors.root.message}
              </Text>
            )}
          </Pressable>
        </ScrollView>
        <View style={styles.footer}>
          <Button fullWidth label={strings.submit} onPress={onSubmit} disabled={isSubmitting} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
