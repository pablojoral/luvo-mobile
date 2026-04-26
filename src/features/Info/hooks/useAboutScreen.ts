import { useTranslation } from 'react-i18next';
import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';
import { useContent } from 'query/Content/useContent';

export const useAboutScreen = () => {
  const { t } = useTranslation('common');
  const navigation = useRootStackNavigation();
  const { data: content, isLoading, error } = useContent('about');

  const handleGoBack = () => navigation.goBack();

  return {
    title: t('info.about.title'),
    loadingText: t('info.loading'),
    loadError: t('info.loadError'),
    content,
    isLoading,
    error,
    handleGoBack,
  };
};
