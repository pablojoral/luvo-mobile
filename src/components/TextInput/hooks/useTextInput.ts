import { useState } from 'react';

export const useTextInput = (secureTextEntry?: boolean) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleToggleVisibility = () => setIsVisible(v => !v);

  return {
    isVisible,
    handleToggleVisibility,
    resolvedSecureTextEntry: secureTextEntry ? !isVisible : secureTextEntry,
  };
};
