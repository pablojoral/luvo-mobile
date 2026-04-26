import { useCallback } from 'react';
import i18n from 'services/i18n/i18n';
import type { SupportedLanguage } from 'services/i18n';

interface UseLanguagePickerProps {
  onSelect: (lang: SupportedLanguage) => void;
  onClose: () => void;
}

export const useLanguagePicker = ({ onSelect, onClose }: UseLanguagePickerProps) => {
  const handleSelect = useCallback(
    (lang: SupportedLanguage) => {
      i18n.changeLanguage(lang).catch(() => {}); // fire-and-forget: UI still updates via i18next listener
      onSelect(lang);
      onClose();
    },
    [onSelect, onClose],
  );

  return { handleSelect };
};
