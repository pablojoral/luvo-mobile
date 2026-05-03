import { useMessagesStore } from 'stores/useMessagesStore';
import { useMessagesModalStrings } from './useMessagesModalStrings';

export const useMessagesModal = () => {
  const { messages, currentIndex, next, prev, dismiss } = useMessagesStore();
  const { backLabel, nextLabel, understoodLabel } = useMessagesModalStrings();

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
    backLabel,
    nextLabel,
    understoodLabel,
  };
};
