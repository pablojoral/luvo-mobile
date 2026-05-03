import { useTranslation } from 'react-i18next';

export const useMessagesModalStrings = () => {
  const { t } = useTranslation('common');

  return {
    backLabel: t('actions.back'),
    nextLabel: t('messages.next'),
    understoodLabel: t('messages.understood'),
  };
};
