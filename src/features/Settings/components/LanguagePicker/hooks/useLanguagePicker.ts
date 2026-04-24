import { useCallback } from 'react';
import type { SupportedLanguage } from 'services/i18n';

interface UseLanguagePickerProps {
  onSelect: (lang: SupportedLanguage) => void;
  onClose: () => void;
}

export const useLanguagePicker = ({ onSelect, onClose }: UseLanguagePickerProps) => {
  const handleSelect = useCallback(
    (lang: SupportedLanguage) => {
      onSelect(lang);
      onClose();
    },
    [onSelect, onClose],
  );

  return { handleSelect };
};
