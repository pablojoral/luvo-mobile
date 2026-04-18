import { Button } from 'components/Button/Button';
import { ScreenHeader } from 'components/ScreenHeader/ScreenHeader';
import { Text } from 'components/Text/Text';
import { TextInput } from 'components/TextInput/TextInput';
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
  const { control, errors, isSubmitting, onSubmit } = useReportForm({
    laundryId,
    machineId,
    onSuccess: () => navigation.goBack(),
  });

  return (
    <View style={styles.container}>
      <ScreenHeader title="Reportar problema" onBack={() => navigation.goBack()} />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView bounces={false} keyboardShouldPersistTaps="handled">
          <Pressable onPress={Keyboard.dismiss} style={styles.content}>
            <Controller
              control={control}
              name="subject"
              rules={{ required: 'El asunto es obligatorio' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Asunto"
                  placeholder="Describe brevemente el problema"
                  maxLength={200}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.subject?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="description"
              rules={{ required: 'La descripción es obligatoria' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Descripción"
                  placeholder="Explica el problema con más detalle"
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
          <Button fullWidth label="Enviar reporte" onPress={onSubmit} disabled={isSubmitting} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
