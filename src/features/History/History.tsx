import { SafeScreenHeader } from 'components/SafeScreenHeader/SafeScreenHeader';
import { ActivityIndicator } from 'components/ActivityIndicator/ActivityIndicator';
import { FlatList, View } from 'react-native';
import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';

import { HistoryEmptyState } from './components/HistoryEmptyState/HistoryEmptyState';
import { StatsHeader } from './components/StatsHeader/StatsHeader';
import { useHistoryScreen } from './hooks/useHistoryScreen';
import { useHistoryTheme } from './theme/useHistoryTheme';

export const History = () => {
  const navigation = useRootStackNavigation();
  const { styles } = useHistoryTheme();
  const { title, items, isLoading, isFetchingNextPage, handleEndReached, renderItem, keyExtractor } =
    useHistoryScreen();

  return (
    <View style={styles.container}>
      <SafeScreenHeader title={title} onBack={() => navigation.goBack()} />

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListHeaderComponent={<StatsHeader />}
          ListEmptyComponent={<HistoryEmptyState />}
          ListFooterComponent={isFetchingNextPage ? <ActivityIndicator size="small" /> : null}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.3}
          style={styles.list}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};
