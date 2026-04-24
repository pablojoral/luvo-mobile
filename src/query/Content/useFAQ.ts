import { useQuery } from '@tanstack/react-query';

import { contentService, FAQItem } from 'services/api/services/ContentService';
import { qk } from '../keys';

const FAQ_STALE_TIME = 5 * 60 * 1000;

export function useFAQ() {
  return useQuery<FAQItem[]>({
    queryKey: qk.faq.list(),
    queryFn: () => contentService.getFAQ(),
    staleTime: FAQ_STALE_TIME,
  });
}
