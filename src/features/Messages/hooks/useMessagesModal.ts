import { useTranslation } from 'react-i18next';
import { useMessagesStore } from 'stores/useMessagesStore';

export const useMessagesModal = () => {
  const { messages, currentIndex, next, prev, dismiss } = useMessagesStore();
  const { t } = useTranslation('common');

  const message = messages[currentIndex];
  const visible = messages.length > 0;
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === messages.length - 1;

  return {
    messages,
    message,
    currentIndex,
    visible,
    isFirst,
    isLast,
    next,
    prev,
    dismiss,
    backLabel: t('actions.back'),
    nextLabel: t('messages.next'),
    understoodLabel: t('messages.understood'),
  };
};
