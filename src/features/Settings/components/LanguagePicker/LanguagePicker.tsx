import { FlatList, Modal, TouchableOpacity, View } from 'react-native';
import { Text } from '@luvo/ui';
import type { SupportedLanguage } from 'services/i18n/languages';
import { useLanguagePicker } from './hooks/useLanguagePicker';
import { useLanguagePickerTheme } from './theme/useLanguagePickerTheme';

interface LanguagePickerProps {
  visible: boolean;
  currentLanguage: SupportedLanguage;
  onSelect: (lang: SupportedLanguage) => void;
  onClose: () => void;
}

export const LanguagePicker = ({ visible, currentLanguage, onSelect, onClose }: LanguagePickerProps) => {
  const { styles } = useLanguagePickerTheme();
  const { languages, keyExtractor, renderItem, pickerTitle } = useLanguagePicker({
    onSelect,
    onClose,
    currentLanguage,
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />
      <View style={styles.sheet}>
        <View style={styles.handle} />
        <Text
          fontSize="font-size-md"
          fontWeight="semibold"
          style={styles.title}
        >
          {pickerTitle}
        </Text>
        <FlatList
          data={languages}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          scrollEnabled={false}
        />
      </View>
    </Modal>
  );
};
