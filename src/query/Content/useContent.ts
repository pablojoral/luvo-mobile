import { useQuery } from '@tanstack/react-query';

import { contentService, Content } from 'services/api/services/ContentService';
import { qk } from '../keys';

const CONTENT_STALE_TIME = 5 * 60 * 1000; // 5 minutes

export function useContent(key: string) {
  return useQuery<Content>({
    queryKey: qk.content.byKey(key),
    queryFn: () => contentService.getContent(key),
    staleTime: CONTENT_STALE_TIME,
  });
}

export function useFAQ() {
  return useQuery({
    queryKey: qk.faq.list(),
    queryFn: () => contentService.getFAQ(),
    staleTime: CONTENT_STALE_TIME,
  });
}
