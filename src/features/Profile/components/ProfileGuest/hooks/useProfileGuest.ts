import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';
import { useProfileGuestStrings } from './useProfileGuestStrings';

export const useProfileGuest = () => {
  const navigation = useRootStackNavigation();
  const { title, subtitle, signInLabel } = useProfileGuestStrings();

  const handleSignIn = () => navigation.navigate('Auth');

  return {
    handleSignIn,
    title,
    subtitle,
    signInLabel,
  };
};
