import { useTranslation } from 'react-i18next';

export const useProfileHeader = () => {
  const { t } = useTranslation('common');

  return {
    greeting: t('profile.header.greeting'),
  };
};
