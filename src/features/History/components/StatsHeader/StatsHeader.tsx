import { Text } from 'components/Text/Text';
import { View } from 'react-native';
import { useHistoryTheme } from '../../theme/useHistoryTheme';
import { useStatsHeader } from './hooks/useStatsHeader';

export const StatsHeader = () => {
  const { styles } = useHistoryTheme();
  const { spentThisMonthLabel, cyclesCompletedLabel, formattedAmount } = useStatsHeader();

  return (
    <View style={styles.statsCard}>
      <Text style={styles.statsLabel}>{spentThisMonthLabel}</Text>
      <Text style={styles.statsAmount}>{formattedAmount}</Text>
      <Text style={styles.statsCycles}>{cyclesCompletedLabel}</Text>
    </View>
  );
};
