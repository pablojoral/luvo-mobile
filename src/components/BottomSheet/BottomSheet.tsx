import { Text } from 'components/Text/Text';
import { Modal, TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { useBottomSheet } from './hooks/useBottomSheet';
import { useBottomSheetTheme } from './theme/useBottomSheetTheme';

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const BottomSheet = ({ visible, onClose, title, children }: BottomSheetProps) => {
  const { styles } = useBottomSheetTheme();
  const { mounted, backdropStyle, sheetStyle } = useBottomSheet(visible);

  return (
    <Modal visible={mounted} transparent animationType="none" onRequestClose={onClose}>
      <View style={styles.container}>
        <Animated.View style={[styles.backdrop, backdropStyle]}>
          <TouchableOpacity style={styles.backdropPress} activeOpacity={1} onPress={onClose} />
        </Animated.View>
        <Animated.View style={[styles.sheet, sheetStyle]}>
          <View style={styles.handle} />
          {title && (
            <Text fontSize="font-size-md" fontWeight="semibold" style={styles.title}>
              {title}
            </Text>
          )}
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};
