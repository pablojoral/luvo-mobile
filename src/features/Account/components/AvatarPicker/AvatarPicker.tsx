import { BottomSheet } from 'components/BottomSheet/BottomSheet';
import { FlatList } from 'react-native';
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
    <BottomSheet visible={visible} onClose={onClose} title={title}>
      <FlatList
        data={AVATARS}
        numColumns={AVATARS.length}
        keyExtractor={keyExtractor}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={renderItem}
      />
    </BottomSheet>
  );
};
