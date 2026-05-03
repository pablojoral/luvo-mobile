import { useTranslation } from 'react-i18next';
import type { AuthMode } from './useAuthForm';

export const useAuthStrings = (mode: AuthMode) => {
  const { t } = useTranslation('common');
  const isRegister = mode === 'register';
  return {
    heading:                   isRegister ? t('auth.heading.register') : t('auth.heading.login'),
    subtitle:                  isRegister ? t('auth.subtitle.register') : t('auth.subtitle.login'),
    emailLabel:                t('auth.form.email.label'),
    emailPlaceholder:          t('auth.form.email.placeholder'),
    passwordLabel:             t('auth.form.password.label'),
    passwordPlaceholder:       t('auth.form.password.placeholder'),
    submitLabel:               isRegister ? t('auth.form.submit.register') : t('auth.form.submit.login'),
    forgotPasswordLabel:       t('auth.form.forgotPassword'),
    forgotPasswordSuccessLabel: t('auth.form.forgotPasswordSuccess'),
    socialDividerLabel:        t('auth.form.socialDivider'),
    googleSignInLabel:         t('auth.form.googleSignIn'),
    appleSignInLabel:          t('auth.form.appleSignIn'),
    signUpPromptLabel:         t('auth.form.signUpPrompt'),
    signUpLinkLabel:           t('auth.form.signUpLink'),
    signInPromptLabel:         t('auth.form.signInPrompt'),
    signInLinkLabel:           t('auth.form.signInLink'),
  };
};
