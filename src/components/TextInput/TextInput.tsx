import { View, TextInput as RNTextInput, TextInputProps as RNTextInputProps } from 'react-native';
import { Text } from 'components/Text/Text';
import { FontColor } from 'theme/types/Theme';

import { useTextInputTheme } from './theme/useTextInputTheme';

export interface TextInputProps extends RNTextInputProps {
  label?: string;
  error?: string;
  color?: FontColor;
  placeholderColor?: FontColor;
}

export const TextInput = ({ label, error, color, placeholderColor, style, maxLength, value, ...rest }: TextInputProps) => {
  const { styles, placeholderTextColor } = useTextInputTheme({ error: !!error, color, placeholderColor });
  const remaining = maxLength !== undefined ? maxLength - (value?.length ?? 0) : undefined;

  return (
    <View style={styles.container}>
      {label && (
        <Text fontSize="font-size-sm" fontWeight="semibold">
          {label}
        </Text>
      )}
      <RNTextInput
        style={[styles.input, style]}
        placeholderTextColor={placeholderTextColor}
        maxLength={maxLength}
        value={value}
        {...rest}
      />
      <View style={styles.footer}>
        {error && (
          <Text fontSize="font-size-xs" color="font-error" style={{ flex: 1 }}>
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
