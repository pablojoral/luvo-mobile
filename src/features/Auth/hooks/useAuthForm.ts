import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { sendPasswordReset, signInWithEmail, signUpWithEmail } from 'services/firebase/firebaseAuth';
import { useAuthFormStrings } from './useAuthFormStrings';

export type AuthMode = 'login' | 'register';

export interface AuthFormValues {
  email:    string;
  password: string;
}

export const useAuthForm = (mode: AuthMode) => {
  const { emailRequired, emailInvalid, passwordRequired, passwordMinLength, errorsGeneric } = useAuthFormStrings();
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
    required: emailRequired,
    pattern: { value: /\S+@\S+\.\S+/, message: emailInvalid },
  };

  const passwordRules = {
    required: passwordRequired,
    minLength: { value: 6, message: passwordMinLength },
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
        message: err instanceof Error ? err.message : errorsGeneric,
      });
    }
  });

  const handleForgotPassword = async () => {
    const email = getValues('email');
    if (!email) {
      setError('email', { message: emailRequired });
      return;
    }
    try {
      await sendPasswordReset(email);
      setForgotPasswordSent(true);
    } catch (err: unknown) {
      setError('root', {
        message: err instanceof Error ? err.message : errorsGeneric,
      });
    }
  };

  return { control, errors, isSubmitting, onSubmit, emailRules, passwordRules, handleForgotPassword, forgotPasswordSent, reset };
};
