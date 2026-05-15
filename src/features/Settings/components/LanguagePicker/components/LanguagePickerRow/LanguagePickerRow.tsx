import { Text } from '@luvo/ui';
import { TouchableOpacity, View } from 'react-native';
import type { LanguageOption, SupportedLanguage } from 'services/i18n/languages';
import { useLanguagePickerTheme } from '../../theme/useLanguagePickerTheme';

interface LanguagePickerRowProps {
  option: LanguageOption;
  isSelected: boolean;
  onPress: (code: SupportedLanguage) => void;
}

export const LanguagePickerRow = ({ option, isSelected, onPress }: LanguagePickerRowProps) => {
  const { styles } = useLanguagePickerTheme();

  return (
    <TouchableOpacity
      style={[styles.rowBase, isSelected ? styles.rowSelected : styles.rowUnselected]}
      onPress={() => onPress(option.code)}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={option.nativeLabel}
      accessibilityState={{ selected: isSelected }}
    >
      <Text fontSize="font-size-md" fontWeight={isSelected ? 'semibold' : 'regular'}>
        {option.nativeLabel}
      </Text>
      {isSelected ? (
        <View style={styles.checkmark} />
      ) : (
        <View style={styles.checkmarkPlaceholder} />
      )}
    </TouchableOpacity>
  );
};
