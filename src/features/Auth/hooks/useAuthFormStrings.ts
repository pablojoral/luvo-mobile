import { useTranslation } from 'react-i18next';

export const useAuthFormStrings = () => {
  const { t } = useTranslation('common');

  return {
    emailRequired: t('auth.form.email.required'),
    emailInvalid: t('auth.form.email.invalid'),
    passwordRequired: t('auth.form.password.required'),
    passwordMinLength: t('auth.form.password.minLength'),
    errorsGeneric: t('errors.generic'),
  };
};
