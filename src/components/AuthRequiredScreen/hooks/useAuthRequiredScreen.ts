import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';

export const useAuthRequiredScreen = () => {
  const navigation = useRootStackNavigation();

  const handleSignIn = () => navigation.navigate('Auth');

  return { handleSignIn };
};
