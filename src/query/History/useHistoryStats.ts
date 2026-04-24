import { useQuery } from '@tanstack/react-query';

import { historyService, HistoryStats } from 'services/api/services/HistoryService';
import { qk } from '../keys';

export function useHistoryStats() {
  return useQuery<HistoryStats>({
    queryKey: qk.history.stats(),
    queryFn:  () => historyService.getStats(),
    staleTime: 60 * 1000,
  });
}
