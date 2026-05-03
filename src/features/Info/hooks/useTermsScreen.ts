import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';
import { useContent } from 'query/Content/useContent';
import { useTermsStrings } from './useTermsStrings';

export const useTermsScreen = () => {
  const strings = useTermsStrings();
  const navigation = useRootStackNavigation();
  const { data: content, isLoading, error } = useContent('terms');

  const handleGoBack = () => navigation.goBack();

  return {
    ...strings,
    content,
    isLoading,
    error,
    handleGoBack,
  };
};
