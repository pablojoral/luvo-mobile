import { Text } from '@luvo/ui';
import { View } from 'react-native';
import { useAccountDetailRowTheme } from './theme/useAccountDetailRowTheme';

interface AccountDetailRowProps {
  label: string;
  value: string;
}

export const AccountDetailRow = ({ label, value }: AccountDetailRowProps) => {
  const { styles } = useAccountDetailRowTheme();

  return (
    <View style={styles.container}>
      <Text fontSize="font-size-xs" fontWeight="semibold" color="font-light">
        {label}
      </Text>
      <Text fontSize="font-size-md" fontWeight="semibold">
        {value}
      </Text>
    </View>
  );
};
