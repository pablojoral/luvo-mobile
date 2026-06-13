import { useTranslation } from 'react-i18next';

export const useHistoryListFooterStrings = () => {
  const { t } = useTranslation('common');

  return { endOfListText: t('history.endOfList') };
};
