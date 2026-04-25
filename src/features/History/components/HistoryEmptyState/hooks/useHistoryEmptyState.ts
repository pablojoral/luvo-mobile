import { useTranslation } from 'react-i18next';

export const useHistoryEmptyState = () => {
  const { t } = useTranslation('common');

  return { emptyText: t('history.empty') };
};
