import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'navigation/RootStackNavigator';
import { useFirebaseAuthState } from 'query/Auth/useAuth';
import { useAuthForm, AuthMode } from './useAuthForm';
import { useSocialAuth } from './useSocialAuth';

type AuthNavigation = NativeStackNavigationProp<RootStackParamList, 'Auth'>;

export const useAuthScreen = (initialMode: AuthMode, navigation: AuthNavigation) => {
  const { t } = useTranslation('common');
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
    heading: mode === 'register' ? t('auth.heading.register') : t('auth.heading.login'),
    subtitle: mode === 'register' ? t('auth.subtitle.register') : t('auth.subtitle.login'),
    emailLabel: t('auth.form.email.label'),
    emailPlaceholder: t('auth.form.email.placeholder'),
    passwordLabel: t('auth.form.password.label'),
    passwordPlaceholder: t('auth.form.password.placeholder'),
    submitLabel: mode === 'register' ? t('auth.form.submit.register') : t('auth.form.submit.login'),
    forgotPasswordLabel: t('auth.form.forgotPassword'),
    forgotPasswordSuccessLabel: t('auth.form.forgotPasswordSuccess'),
    socialDividerLabel: t('auth.form.socialDivider'),
    googleSignInLabel: t('auth.form.googleSignIn'),
    appleSignInLabel: t('auth.form.appleSignIn'),
    signUpPromptLabel: t('auth.form.signUpPrompt'),
    signUpLinkLabel: t('auth.form.signUpLink'),
    signInPromptLabel: t('auth.form.signInPrompt'),
    signInLinkLabel: t('auth.form.signInLink'),
  };
};
