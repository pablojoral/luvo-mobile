import { useEffect, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'navigation/RootStackNavigator';
import { useFirebaseAuthState } from 'query/Auth/useAuth';
import { useAuthForm, AuthMode } from './useAuthForm';
import { useSocialAuth } from './useSocialAuth';
import { useAuthStrings } from './useAuthStrings';

type AuthNavigation = NativeStackNavigationProp<RootStackParamList, 'Auth'>;

export const useAuthScreen = (initialMode: AuthMode, navigation: AuthNavigation) => {
  const { data: firebaseUser } = useFirebaseAuthState();
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const {
    control,
    errors,
    isSubmitting,
    onSubmit,
    emailRules,
    passwordRules,
    handleForgotPassword,
    forgotPasswordSent,
    reset,
  } = useAuthForm(mode);
  const { handleSocialSignIn, error: socialError, isSubmitting: isSocialSubmitting, showApple } = useSocialAuth();
  const strings = useAuthStrings(mode);

  const isLoading = isSubmitting || isSocialSubmitting;

  const handleToggleMode = () => {
    const next = mode === 'login' ? 'register' : 'login';
    setMode(next);
    reset();
  };

  useEffect(() => {
    if (firebaseUser) navigation.goBack();
  }, [firebaseUser, navigation]);

  return {
    control,
    errors,
    isSubmitting,
    isLoading,
    onSubmit,
    emailRules,
    passwordRules,
    handleForgotPassword,
    forgotPasswordSent,
    handleSocialSignIn,
    socialError,
    isSocialSubmitting,
    showApple,
    handleToggleMode,
    mode,
    ...strings,
  };
};
