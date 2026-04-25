import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from 'navigation/RootStackNavigator';
import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';
import { useFirebaseAuthState } from 'query/Auth/useAuth';
import { useRegisterMyLaundry } from 'query/MyLaundries/useRegisterMyLaundry';
import { useTranslation } from 'react-i18next';

export const useLaundryRegistrationScreen = () => {
  const { t } = useTranslation('common');
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
    title: t('laundryRegistration.title'),
    guestPrompt: t('laundryRegistration.guestPrompt'),
    signInLabel: t('auth.signIn'),
    accessCodeLabel: t('laundryRegistration.accessCodeLabel'),
    description: t('laundryRegistration.description'),
    invalidCode: t('laundryRegistration.invalidCode'),
    addButton: t('laundryRegistration.addButton'),
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
