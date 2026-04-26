import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';
import { useFAQ } from 'query/Content/useFAQ';
import type { FAQItem } from 'services/api/services/ContentService';

import { FAQAccordionItem } from '../components/FAQAccordionItem/FAQAccordionItem';

export const useFAQScreen = () => {
  const { t } = useTranslation('common');
  const navigation = useRootStackNavigation();
  const { data: items, isLoading, error } = useFAQ();

  const renderItem = useCallback(({ item }: { item: FAQItem }) => <FAQAccordionItem item={item} />, []);
  const keyExtractor = useCallback((item: FAQItem) => String(item.id), []);

  const handleGoBack = () => navigation.goBack();

  return {
    title: t('info.faq.title'),
    loadingText: t('info.loading'),
    loadError: t('info.loadError'),
    items,
    isLoading,
    error,
    renderItem,
    keyExtractor,
    handleGoBack,
  };
};
