import { useCallback } from 'react';
import { useHistory } from 'query/History/useHistory';
import type { HistoryItem } from 'services/api/services/HistoryService';
import type { ListRenderItem } from 'react-native';
import { CycleCard } from '../components/CycleCard';

export const useHistoryScreen = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useHistory();

  const items: HistoryItem[] = data?.pages.flatMap(p => p.data) ?? [];

  const handleEndReached = useCallback(() => {
    if (hasNextPage) fetchNextPage();
  }, [hasNextPage, fetchNextPage]);

  const renderItem = useCallback<ListRenderItem<HistoryItem>>(
    ({ item }) => <CycleCard item={item} />,
    [],
  );

  const keyExtractor = useCallback((item: HistoryItem) => item.id, []);

  return { items, isLoading, isFetchingNextPage, handleEndReached, renderItem, keyExtractor };
};
