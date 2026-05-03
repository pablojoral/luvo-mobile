import { useCallback } from 'react';
import { type ListRenderItemInfo } from 'react-native';
import i18n from 'services/i18n/i18n';
import type { LanguageOption, SupportedLanguage } from 'services/i18n/languages';
import { SUPPORTED_LANGUAGES } from 'services/i18n/languages';
import { LanguagePickerRow } from '../components/LanguagePickerRow/LanguagePickerRow';
import { useLanguagePickerStrings } from './useLanguagePickerStrings';

interface UseLanguagePickerProps {
  onSelect: (lang: SupportedLanguage) => void;
  onClose: () => void;
  currentLanguage: SupportedLanguage;
}

export const useLanguagePicker = ({ onSelect, onClose, currentLanguage }: UseLanguagePickerProps) => {
  const { pickerTitle } = useLanguagePickerStrings();

  const handleSelect = useCallback(
    (lang: SupportedLanguage) => {
      i18n.changeLanguage(lang).catch(() => {}); // fire-and-forget: UI still updates via i18next listener
      onSelect(lang);
      onClose();
    },
    [onSelect, onClose],
  );

  const keyExtractor = useCallback((item: LanguageOption) => item.code, []);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<LanguageOption>) => (
      <LanguagePickerRow
        option={item}
        isSelected={item.code === currentLanguage}
        onPress={handleSelect}
      />
    ),
    [currentLanguage, handleSelect],
  );

  return {
    languages: SUPPORTED_LANGUAGES,
    handleSelect,
    keyExtractor,
    renderItem,
    pickerTitle,
  };
};

export { SUPPORTED_LANGUAGES };
