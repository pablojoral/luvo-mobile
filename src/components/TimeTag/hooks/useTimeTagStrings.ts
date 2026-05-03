import { useTranslation } from 'react-i18next';

export const useTimeTagStrings = () => {
  const { t } = useTranslation('common');

  return {
    endsIn: t('machines.endsIn'),
  };
};
