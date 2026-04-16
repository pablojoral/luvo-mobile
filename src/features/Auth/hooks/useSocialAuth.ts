import { useState } from 'react';
import { Platform } from 'react-native';
import { signInWithApple, signInWithGoogle } from 'services/firebase/firebaseAuth';

export const useSocialAuth = () => {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSocialSignIn = async (provider: 'google' | 'apple') => {
    setError(null);
    setIsSubmitting(true);
    try {
      if (provider === 'google') await signInWithGoogle();
      else await signInWithApple();
    } catch (err: any) {
      setError(err?.message ?? 'Algo salió mal. Intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const showApple = Platform.OS === 'ios';

  return { handleSocialSignIn, error, isSubmitting, showApple };
};
