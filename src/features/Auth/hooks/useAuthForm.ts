import { useForm } from 'react-hook-form';
import { signInWithEmail, signUpWithEmail } from 'services/firebase/firebaseAuth';

export type AuthMode = 'login' | 'register';

export interface AuthFormValues {
  email:    string;
  password: string;
}

export const useAuthForm = (mode: AuthMode) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<AuthFormValues>({
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = handleSubmit(async ({ email, password }) => {
    try {
      if (mode === 'register') {
        await signUpWithEmail(email, password);
      } else {
        await signInWithEmail(email, password);
      }
    } catch (err: any) {
      setError('root', {
        message: err?.message ?? 'Algo salió mal. Intenta nuevamente.',
      });
    }
  });

  return { control, errors, isSubmitting, onSubmit };
};
