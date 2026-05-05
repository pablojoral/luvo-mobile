import { useCallback } from 'react';
import { useErrorScreenStrings } from './useErrorScreenStrings';

export const useErrorScreen = (onReset: () => void) => {
  const strings = useErrorScreenStrings();
  const handleRetry = useCallback(() => onReset(), [onReset]);
  return { strings, handleRetry };
};
