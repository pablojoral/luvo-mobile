import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from 'navigation/RootStackNavigator';
import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';
import { useFirebaseAuthState } from 'query/Auth/useAuth';
import { useRegisterMyLaundry } from 'query/MyLaundries/useRegisterMyLaundry';
import { useLaundryRegistrationStrings } from './useLaundryRegistrationStrings';

export const useLaundryRegistrationScreen = () => {
  const strings = useLaundryRegistrationStrings();
  const route = useRoute<RouteProp<RootStackParamList, 'RegisterLaundry'>>();
  const navigation = useRootStackNavigation();
  const { code } = route.params;

  const { data: firebaseUser, isLoading: authLoading } = useFirebaseAuthState();
  const { mutate: register, isPending, isError, reset } = useRegisterMyLaundry();

  const handleRegister = () => {
    reset();
    register(code, {
      onSuccess: () => navigation.goBack(),
    });
  };

  const handleGoBack = () => navigation.goBack();

  const handleSignIn = () => {
    navigation.goBack();
    navigation.navigate('Auth');
  };

  return {
    ...strings,
    code,
    firebaseUser,
    authLoading,
    isPending,
    isError,
    handleRegister,
    handleGoBack,
    handleSignIn,
  };
};
