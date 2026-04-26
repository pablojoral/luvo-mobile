import { useCallback } from 'react';
import { SupportedLanguage } from '../../../constants/languages';

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
