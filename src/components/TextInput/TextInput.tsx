import { Icon } from 'components/Icon/Icon';
import { Text } from 'components/Text/Text';
import { View, TextInput as RNTextInput, TextInputProps as RNTextInputProps, TouchableOpacity } from 'react-native';
import { FontColor } from 'theme/types/Theme';

import { useTextInput } from './hooks/useTextInput';
import { useTextInputTheme } from './theme/useTextInputTheme';

export interface TextInputProps extends RNTextInputProps {
  label?: string;
  error?: string;
  color?: FontColor;
  placeholderColor?: FontColor;
}

export const TextInput = ({
  label,
  error,
  color,
  placeholderColor,
  style,
  maxLength,
  value,
  secureTextEntry,
  ...rest
}: TextInputProps) => {
  const { styles, placeholderTextColor } = useTextInputTheme({ error: !!error, color, placeholderColor });
  const { isVisible, handleToggleVisibility, resolvedSecureTextEntry } = useTextInput(secureTextEntry);
  const remaining = maxLength !== undefined ? maxLength - (value?.length ?? 0) : undefined;

  return (
    <View style={styles.container}>
      {label && (
        <Text fontSize="font-size-sm" fontWeight="semibold">
          {label}
        </Text>
      )}
      <View style={styles.inputWrapper}>
        <RNTextInput
          style={[styles.input, style]}
          placeholderTextColor={placeholderTextColor}
          maxLength={maxLength}
          value={value}
          secureTextEntry={resolvedSecureTextEntry}
          {...rest}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={handleToggleVisibility} style={styles.eyeButton}>
            <Icon name={isVisible ? 'eye-outline' : 'eye-off-outline'} size="font-size-xl" color="font-placeholder" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.footer}>
        {error && (
          <Text fontSize="font-size-xs" color="font-error" style={styles.errorText}>
            {error}
          </Text>
        )}
        {remaining !== undefined && (
          <Text fontSize="font-size-xs" color="font-placeholder">
            {remaining}
          </Text>
        )}
      </View>
    </View>
  );
};
