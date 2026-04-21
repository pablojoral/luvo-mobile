import { ScreenHeader } from 'components/ScreenHeader/ScreenHeader';
import { Text } from 'components/Text/Text';
import { ActivityIndicator } from 'components/ActivityIndicator/ActivityIndicator';
import { FlatList, View } from 'react-native';
import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';
import { useHistory } from 'query/History/useHistory';
import { useHistoryStats } from 'query/History/useHistoryStats';
import type { HistoryItem } from 'services/api/services/HistoryService';

import { CycleCard } from './components/CycleCard';
import { useHistoryTheme } from './theme/useHistoryTheme';

function formatAmount(amount: number | null, currency: string | null): string {
  if (amount === null || currency === null) return '—';
  try {
    return new Intl.NumberFormat('es-UY', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `$${amount} ${currency}`;
  }
}

const StatsHeader = () => {
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

export const History = () => {
  const navigation = useRootStackNavigation();
  const { styles } = useHistoryTheme();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useHistory();

  const items: HistoryItem[] = data?.pages.flatMap(p => p.data) ?? [];

  return (
    <View style={styles.container}>
      <ScreenHeader title="Historial" onBack={() => navigation.goBack()} />

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <CycleCard item={item} />}
          ListHeaderComponent={<StatsHeader />}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text color="font-secondary">No tenés ciclos registrados aún.</Text>
            </View>
          }
          ListFooterComponent={isFetchingNextPage ? <ActivityIndicator size="small" /> : null}
          onEndReached={() => { if (hasNextPage) fetchNextPage(); }}
          onEndReachedThreshold={0.3}
          style={styles.list}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};
