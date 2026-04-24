import { Text } from 'components/Text/Text';
import { useHistoryStats } from 'query/History/useHistoryStats';
import { View } from 'react-native';
import { useHistoryTheme } from '../../theme/useHistoryTheme';
import { formatAmount } from 'utils/History/formatHistoryItem';

export const StatsHeader = () => {
  const { styles } = useHistoryTheme();
  const { data: stats } = useHistoryStats();

  return (
    <View style={styles.statsCard}>
      <Text style={styles.statsLabel}>Gastado este mes</Text>
      <Text style={styles.statsAmount}>
        {formatAmount(stats?.totalSpentThisMonth ?? null, stats?.currency ?? null)}
      </Text>
      <Text style={styles.statsCycles}>
        {stats?.cyclesThisMonth ?? 0} ciclos completados
      </Text>
    </View>
  );
};
