import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'query/History/useHistory';
import type { HistoryItem } from 'services/api/services/HistoryService';
import type { ListRenderItem } from 'react-native';
import { CycleCard } from '../components/CycleCard/CycleCard';

export const useHistoryScreen = () => {
  const { t } = useTranslation('common');
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useHistory();

  const title = t('history.title');
  const items: HistoryItem[] = data?.pages.flatMap(p => p.data) ?? [];

  const handleEndReached = useCallback(() => {
    if (hasNextPage) fetchNextPage();
  }, [hasNextPage, fetchNextPage]);

  const renderItem = useCallback<ListRenderItem<HistoryItem>>(({ item }) => {
    return <CycleCard item={item} />;
  }, []);

  const keyExtractor = useCallback((item: HistoryItem) => item.id, []);

  return { title, items, isLoading, isFetchingNextPage, handleEndReached, renderItem, keyExtractor };
};
