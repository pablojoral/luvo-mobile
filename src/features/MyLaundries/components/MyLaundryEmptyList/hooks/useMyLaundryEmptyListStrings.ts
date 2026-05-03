import { useTranslation } from 'react-i18next';

export const useMyLaundryEmptyListStrings = () => {
  const { t } = useTranslation('common');

  return {
    title: t('myLaundries.empty.title'),
    body: t('myLaundries.empty.body'),
  };
};
