import { useTranslation } from 'react-i18next';

export const useHistoryEmptyStateStrings = () => {
  const { t } = useTranslation('common');

  return { emptyText: t('history.empty') };
};
