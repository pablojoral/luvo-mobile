import { Button } from 'components/Button/Button';
import { SafeScreenHeader } from 'components/SafeScreenHeader/SafeScreenHeader';
import { SelectInput } from 'components/SelectInput/SelectInput';
import { Text } from 'components/Text/Text';
import { TextInput } from 'components/TextInput/TextInput';
import { RootStackParamList } from 'navigation/RootStackNavigator';
import { Controller } from 'react-hook-form';
import { Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ReportEntityCard } from './components/ReportEntityCard/ReportEntityCard';
import { ReportScanButton } from './components/ReportScanButton/ReportScanButton';
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
    entityName,
    entityIconName,
    subjectOptions,
    onScanForEntity,
    onClearEntity,
    scrollViewRef,
    handleDescriptionFocus,
    strings,
  } = useReportForm({
    laundryId,
    machineId,
    onSuccess: () => navigation.goBack(),
  });

  return (
    <View style={styles.container}>
      <SafeScreenHeader title={strings.title} onBack={() => navigation.goBack()} />
      <View style={styles.body}>
        <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView
            ref={scrollViewRef}
            bounces={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollContent}
          >
            <Pressable onPress={Keyboard.dismiss} style={styles.content}>
              <View>
                <Text fontSize="font-size-sm" fontWeight="semibold" color="font-highlight" style={styles.sectionLabel}>
                  {strings.entitySectionLabel}
                </Text>
                {selectedEntity === null ? (
                  <ReportScanButton
                    hint={strings.entitySectionScanHint}
                    label={strings.entitySectionScan}
                    onPress={onScanForEntity}
                  />
                ) : (
                  <ReportEntityCard
                    iconName={entityIconName}
                    typeLabel={strings.entityTypeLabel(selectedEntity.type)}
                    name={entityName ?? ''}
                    onClear={onClearEntity}
                  />
                )}
              </View>

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
                    onFocus={handleDescriptionFocus}
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
    </View>
  );
};
