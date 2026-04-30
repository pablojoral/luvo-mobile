import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { sendPasswordReset, signInWithEmail, signUpWithEmail } from 'services/firebase/firebaseAuth';

export type AuthMode = 'login' | 'register';

export interface AuthFormValues {
  email:    string;
  password: string;
}

export const useAuthForm = (mode: AuthMode) => {
  const { t } = useTranslation('common');
  const [forgotPasswordSent, setForgotPasswordSent] = useState(false);

  const {
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<AuthFormValues>({
    defaultValues: { email: '', password: '' },
  });

  const emailRules = {
    required: t('auth.form.email.required'),
    pattern: { value: /\S+@\S+\.\S+/, message: t('auth.form.email.invalid') },
  };

  const passwordRules = {
    required: t('auth.form.password.required'),
    minLength: { value: 6, message: t('auth.form.password.minLength') },
  };

  const onSubmit = handleSubmit(async ({ email, password }) => {
    try {
      if (mode === 'register') {
        await signUpWithEmail(email, password);
      } else {
        await signInWithEmail(email, password);
      }
    } catch (err: unknown) {
      setError('root', {
        message: err instanceof Error ? err.message : t('errors.generic'),
      });
    }
  });

  const handleForgotPassword = async () => {
    const email = getValues('email');
    if (!email) {
      setError('email', { message: t('auth.form.email.required') });
      return;
    }
    try {
      await sendPasswordReset(email);
      setForgotPasswordSent(true);
    } catch (err: unknown) {
      setError('root', {
        message: err instanceof Error ? err.message : t('errors.generic'),
      });
    }
  };

  return { control, errors, isSubmitting, onSubmit, emailRules, passwordRules, handleForgotPassword, forgotPasswordSent, reset };
};
