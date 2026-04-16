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

export const TextInput = ({ label, error, color, placeholderColor, style, ...rest }: TextInputProps) => {
  const { styles, placeholderTextColor } = useTextInputTheme({ error: !!error, color, placeholderColor });

  return (
    <View style={styles.container}>
      {label && (
        <Text fontSize="font-size-sm" fontWeight="semibold">
          {label}
        </Text>
      )}
      <RNTextInput style={[styles.input, style]} placeholderTextColor={placeholderTextColor} {...rest} />
      {error && (
        <Text fontSize="font-size-xs" color="font-error">
          {error}
        </Text>
      )}
    </View>
  );
};
