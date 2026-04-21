import { useInfiniteQuery } from '@tanstack/react-query';

import { historyService, HistoryPage } from 'services/api/services/HistoryService';
import { qk } from '../keys';

export function useHistory() {
  return useInfiniteQuery<HistoryPage>({
    queryKey: qk.history.list(),
    queryFn: ({ pageParam }) => historyService.getHistory(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: lastPage =>
      lastPage.pagination.hasMore ? lastPage.pagination.page + 1 : undefined,
  });
}
