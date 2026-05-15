import { ActivityIndicator, Loader, SafeScreenHeader } from '@luvo/ui';
import { SectionList, RefreshControl, View } from 'react-native';
import type { HistoryItem } from 'services/api/services/HistoryService';

import { HistoryEmptyState } from './components/HistoryEmptyState/HistoryEmptyState';
import { StatsHeader } from './components/StatsHeader/StatsHeader';
import { useHistoryScreen } from './hooks/useHistoryScreen';
import { useHistoryTheme } from './theme/useHistoryTheme';

export const History = () => {
  const { styles } = useHistoryTheme();
  const {
    title,
    sections,
    isLoading,
    isRefetching,
    refetch,
    isFetchingNextPage,
    handleGoBack,
    handleEndReached,
    renderItem,
    renderSectionHeader,
    keyExtractor,
  } = useHistoryScreen();

  return (
    <View style={styles.container}>
      <SafeScreenHeader title={title} onBack={handleGoBack} />

      <View style={styles.body}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Loader />
          </View>
        ) : (
          <SectionList<HistoryItem, { title: string }>
            sections={sections}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
            ListHeaderComponent={StatsHeader}
            ListEmptyComponent={HistoryEmptyState}
            ListFooterComponent={isFetchingNextPage ? <ActivityIndicator size="small" /> : null}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.3}
            refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>
    </View>
  );
};
