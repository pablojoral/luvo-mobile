import { Text } from '@luvo/ui';
import { View } from 'react-native';

import { useStatsHeader } from './hooks/useStatsHeader';
import { useStatsHeaderTheme } from './theme/useStatsHeaderTheme';

export const StatsHeader = () => {
  const { styles } = useStatsHeaderTheme();
  const { spentThisMonthLabel, cyclesCompletedLabel, formattedAmount } = useStatsHeader();

  return (
    <View style={styles.card}>
      <Text fontSize="font-size-xs" color="font-placeholder">{spentThisMonthLabel}</Text>
      <Text fontSize="font-size-xxxxl" fontWeight="semibold">{formattedAmount}</Text>
      <Text fontSize="font-size-xs" color="font-placeholder">{cyclesCompletedLabel}</Text>
    </View>
  );
};
