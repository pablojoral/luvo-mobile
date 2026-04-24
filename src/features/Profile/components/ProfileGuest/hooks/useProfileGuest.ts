import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';

export const useProfileGuest = () => {
  const navigation = useRootStackNavigation();

  const handleSignIn = () => navigation.navigate('Auth');

  return { handleSignIn };
};
