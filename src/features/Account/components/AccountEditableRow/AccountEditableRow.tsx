import { Text } from 'components/Text/Text';
import { TextInput as RNTextInput } from 'react-native';
import { View } from 'react-native';
import { useAccountEditableRowTheme } from './theme/useAccountEditableRowTheme';

interface AccountEditableRowProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  error?: string;
}

export const AccountEditableRow = ({
  label,
  value,
  onChangeText,
  onBlur,
  placeholder,
  error,
}: AccountEditableRowProps) => {
  const { styles, placeholderColor } = useAccountEditableRowTheme(!!error);

  return (
    <View style={styles.container}>
      <Text fontSize="font-size-xs" fontWeight="semibold" color="font-light">
        {label}
      </Text>
      <RNTextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        maxLength={50}
      />
      {error ? (
        <Text fontSize="font-size-xs" color="font-error">
          {error}
        </Text>
      ) : null}
    </View>
  );
};
