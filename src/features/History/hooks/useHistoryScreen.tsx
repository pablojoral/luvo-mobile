import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistoryStrings } from './useHistoryStrings';
import { useHistory } from 'query/History/useHistory';
import type { HistoryItem } from 'services/api/services/HistoryService';
import type { SectionListData, SectionListRenderItem } from 'react-native';
import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';
import { CycleCard } from '../components/CycleCard/CycleCard';
import { MonthHeader } from '../components/MonthHeader/MonthHeader';
import { formatMonth } from 'utils/History/formatHistoryItem';

export type HistorySection = { title: string; data: HistoryItem[] };

export const useHistoryScreen = () => {
  const { i18n } = useTranslation('common');
  const { title } = useHistoryStrings();
  const navigation = useRootStackNavigation();
  const { data, isLoading, isRefetching, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } = useHistory();
  const items = useMemo<HistoryItem[]>(() => data?.pages.flatMap(p => p.data) ?? [], [data]);

  const sections = useMemo<HistorySection[]>(() => {
    const result: HistorySection[] = [];
    for (const item of items) {
      const monthKey = formatMonth(item.createdAt, i18n.language);
      const last = result[result.length - 1];
      if (last?.title === monthKey) {
        last.data.push(item);
      } else {
        result.push({ title: monthKey, data: [item] });
      }
    }
    return result;
  }, [items, i18n.language]);

  const handleGoBack = useCallback(() => navigation.goBack(), [navigation]);

  const handleEndReached = useCallback(() => {
    if (hasNextPage) fetchNextPage();
  }, [hasNextPage, fetchNextPage]);

  const renderItem = useCallback<SectionListRenderItem<HistoryItem>>(({ item }) => (
    <CycleCard item={item} />
  ), []);

  const renderSectionHeader = useCallback(
    ({ section }: { section: SectionListData<HistoryItem, { title: string }> }) => (
      <MonthHeader title={section.title} />
    ),
    [],
  );

  const keyExtractor = useCallback((item: HistoryItem) => item.id, []);

  return {
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
  };
};
