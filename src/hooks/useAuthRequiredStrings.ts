import { useTranslation } from 'react-i18next';

export const useAuthRequiredStrings = () => {
  const { t } = useTranslation('common');
  return {
    title:    t('auth.required.title'),
    body:     t('auth.required.body'),
    continue: t('auth.required.continue'),
    cancel:   t('actions.cancel'),
  };
};
