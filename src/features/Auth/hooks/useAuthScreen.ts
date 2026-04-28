import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'navigation/RootStackNavigator';
import { useFirebaseAuthState } from 'query/Auth/useAuth';
import { useAuthForm, AuthMode } from './useAuthForm';

type AuthNavigation = NativeStackNavigationProp<RootStackParamList, 'Auth'>;

export const useAuthScreen = (mode: AuthMode, navigation: AuthNavigation) => {
  const { t } = useTranslation('common');
  const { data: firebaseUser } = useFirebaseAuthState();
  const { control, errors, isSubmitting, onSubmit, emailRules, passwordRules } = useAuthForm(mode);

  useEffect(() => {
    if (firebaseUser) navigation.goBack();
  }, [firebaseUser, navigation]);

  return {
    control,
    errors,
    isSubmitting,
    onSubmit,
    emailRules,
    passwordRules,
    title: t('auth.title'),
    emailLabel: t('auth.form.email.label'),
    emailPlaceholder: t('auth.form.email.placeholder'),
    passwordLabel: t('auth.form.password.label'),
    passwordPlaceholder: t('auth.form.password.placeholder'),
    submitLabel: mode === 'register' ? t('auth.form.submit.register') : t('auth.form.submit.login'),
  };
};
