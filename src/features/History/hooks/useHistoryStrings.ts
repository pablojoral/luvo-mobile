import { useTranslation } from 'react-i18next';

export const useHistoryStrings = () => {
  const { t } = useTranslation('common');
  return {
    title: t('history.title'),
  };
};
