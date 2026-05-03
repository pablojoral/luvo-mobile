import { Button } from 'components/Button/Button';
import { Text } from 'components/Text/Text';
import { TextInput } from 'components/TextInput/TextInput';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { Controller } from 'react-hook-form';
import { useCodeSection } from './hooks/useCodeSection';
import { useCodeSectionTheme } from './theme/useCodeSectionTheme';

interface CodeSectionProps {
  onSubmit: (code: string) => void;
}

export const CodeSection = ({ onSubmit }: CodeSectionProps) => {
  const { control, onSubmit: handleSubmit, isSubmittable, label, subtitle, submitLabel } = useCodeSection(onSubmit);
  const { styles } = useCodeSectionTheme();

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.inner}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <View>
          <Controller
            control={control}
            name="code"
            rules={{ required: true, minLength: 1, maxLength: 8, pattern: /^[0-9]+$/ }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="numeric"
                maxLength={8}
                placeholder="00000"
              />
            )}
          />

          <View style={styles.description}>
            <Text fontSize="font-size-lg" fontWeight="bold" color="font-primary">
              {label}
            </Text>
            <Text fontSize="font-size-sm" color="font-secondary" lineHeight="line-height-lg">
              {subtitle}
            </Text>
          </View>
        </View>
        <Button label={submitLabel} variant="primary" size="md" onPress={handleSubmit} disabled={!isSubmittable} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
