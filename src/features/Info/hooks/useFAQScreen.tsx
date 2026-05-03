import { useCallback } from 'react';
import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';
import { useFAQ } from 'query/Content/useFAQ';
import type { FAQItem } from 'services/api/services/ContentService';
import { FAQAccordionItem } from '../components/FAQAccordionItem/FAQAccordionItem';
import { useFAQStrings } from './useFAQStrings';

export const useFAQScreen = () => {
  const strings = useFAQStrings();
  const navigation = useRootStackNavigation();
  const { data: items, isLoading, error } = useFAQ();

  const renderItem = useCallback(({ item }: { item: FAQItem }) => <FAQAccordionItem item={item} />, []);
  const keyExtractor = useCallback((item: FAQItem) => String(item.id), []);

  const handleGoBack = () => navigation.goBack();

  return {
    ...strings,
    items,
    isLoading,
    error,
    renderItem,
    keyExtractor,
    handleGoBack,
  };
};
