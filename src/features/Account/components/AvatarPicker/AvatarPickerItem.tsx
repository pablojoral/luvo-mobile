import { TouchableOpacity, View } from 'react-native';
import { Text } from 'components/Text/Text';
import { Avatar } from '../Avatar/Avatar';

import { useAvatarPickerItemTheme } from './theme/useAvatarPickerItemTheme';

interface AvatarPickerItemProps {
  avatarId: number;
  selected: boolean;
  onPress: () => void;
}

export const AvatarPickerItem = ({ avatarId, selected, onPress }: AvatarPickerItemProps) => {
  const { styles } = useAvatarPickerItemTheme();

  return (
    <TouchableOpacity style={styles.avatarCell} onPress={onPress} activeOpacity={0.7}>
      <Avatar avatarId={avatarId} size={52} />
      {selected ? (
        <View style={styles.checkBadge}>
          <Text fontSize="font-size-xs" color="font-invert">
            ✓
          </Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};
