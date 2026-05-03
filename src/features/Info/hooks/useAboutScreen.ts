import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';
import { useContent } from 'query/Content/useContent';
import { useAboutStrings } from './useAboutStrings';

export const useAboutScreen = () => {
  const strings = useAboutStrings();
  const navigation = useRootStackNavigation();
  const { data: content, isLoading, error } = useContent('about');

  const handleGoBack = () => navigation.goBack();

  return {
    ...strings,
    content,
    isLoading,
    error,
    handleGoBack,
  };
};
