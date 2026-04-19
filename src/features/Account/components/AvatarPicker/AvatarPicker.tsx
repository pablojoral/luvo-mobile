import { FlatList, Modal, TouchableOpacity, View } from 'react-native';
import { Text } from 'components/Text/Text';
import { AVATARS } from '../../avatars';

import { AvatarPickerItem } from './AvatarPickerItem';
import { useAvatarPickerTheme } from './theme/useAvatarPickerTheme';

interface AvatarPickerProps {
  visible: boolean;
  currentId: number;
  onSelect: (id: number) => void;
  onClose: () => void;
}

export const AvatarPicker = ({ visible, currentId, onSelect, onClose }: AvatarPickerProps) => {
  const { styles } = useAvatarPickerTheme();

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />
      <View style={styles.sheet}>
        <View style={styles.handle} />
        <Text fontSize="font-size-md" fontWeight="semibold" style={styles.title}>
          Elegí tu avatar
        </Text>
        <FlatList
          data={AVATARS}
          numColumns={AVATARS.length}
          keyExtractor={item => String(item.id)}
          columnWrapperStyle={styles.columnWrapper}
          renderItem={({ item }) => (
            <AvatarPickerItem
              avatarId={item.id}
              selected={currentId === item.id}
              onPress={() => { onSelect(item.id); onClose(); }}
            />
          )}
        />
      </View>
    </Modal>
  );
};
