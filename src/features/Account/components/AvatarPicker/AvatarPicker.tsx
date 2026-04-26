import { FlatList, Modal, TouchableOpacity, View } from 'react-native';
import { Text } from 'components/Text/Text';
import { AVATARS } from '../../avatars';

import { useAvatarPicker } from './hooks/useAvatarPicker';
import { useAvatarPickerTheme } from './theme/useAvatarPickerTheme';

interface AvatarPickerProps {
  visible: boolean;
  currentId: number;
  onSelect: (id: number) => void;
  onClose: () => void;
}

export const AvatarPicker = ({ visible, currentId, onSelect, onClose }: AvatarPickerProps) => {
  const { styles } = useAvatarPickerTheme();
  const { renderItem, keyExtractor, title } = useAvatarPicker({ currentId, onSelect, onClose });

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />
      <View style={styles.sheet}>
        <View style={styles.handle} />
        <Text fontSize="font-size-md" fontWeight="semibold" style={styles.title}>
          {title}
        </Text>
        <FlatList
          data={AVATARS}
          numColumns={AVATARS.length}
          keyExtractor={keyExtractor}
          columnWrapperStyle={styles.columnWrapper}
          renderItem={renderItem}
        />
      </View>
    </Modal>
  );
};
