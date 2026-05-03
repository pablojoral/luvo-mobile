import { Text } from 'components/Text/Text';
import { View } from 'react-native';

import { useMonthHeaderTheme } from './theme/useMonthHeaderTheme';

interface MonthHeaderProps {
  title: string;
}

export const MonthHeader = ({ title }: MonthHeaderProps) => {
  const { styles } = useMonthHeaderTheme();

  return (
    <View style={styles.container}>
      <Text fontSize="font-size-xs" fontWeight="bold" color="font-placeholder" style={styles.label}>
        {title.toUpperCase()}
      </Text>
    </View>
  );
};
