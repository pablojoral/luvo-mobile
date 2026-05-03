import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';
import { useAuthRequiredScreenStrings } from './useAuthRequiredScreenStrings';

export const useAuthRequiredScreen = () => {
  const navigation = useRootStackNavigation();
  const { title, defaultSubtitle, signInLabel } = useAuthRequiredScreenStrings();

  const handleSignIn = () => navigation.navigate('Auth');

  return {
    handleSignIn,
    title,
    defaultSubtitle,
    signInLabel,
  };
};
