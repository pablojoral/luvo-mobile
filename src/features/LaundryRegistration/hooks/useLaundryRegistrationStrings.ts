import { useTranslation } from 'react-i18next';

export const useLaundryRegistrationStrings = () => {
  const { t } = useTranslation('common');
  return {
    title:           t('laundryRegistration.title'),
    guestPrompt:     t('laundryRegistration.guestPrompt'),
    signInLabel:     t('auth.signIn'),
    accessCodeLabel: t('laundryRegistration.accessCodeLabel'),
    description:     t('laundryRegistration.description'),
    invalidCode:     t('laundryRegistration.invalidCode'),
    addButton:       t('laundryRegistration.addButton'),
  };
};
