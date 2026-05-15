import { SvgIcon, Text } from '@luvo/ui';
import { TouchableOpacity } from 'react-native';
import { useSwipeActionsStrings } from '../../hooks/useSwipeActionsStrings';
import { useRemoveSwipeActionTheme } from './theme/useRemoveSwipeActionTheme';

interface RemoveSwipeActionProps {
  onPress: () => void;
}

export const RemoveSwipeAction = ({ onPress }: RemoveSwipeActionProps) => {
  const { styles } = useRemoveSwipeActionTheme();
  const { removeLabel } = useSwipeActionsStrings();
  return (
    <TouchableOpacity style={styles.actionRemove} onPress={onPress} activeOpacity={0.8}>
      <SvgIcon name="AlertCircle" size="icon-size-md" color="font-invert" />
      <Text fontSize="font-size-xs" color="font-invert" fontWeight="semibold">
        {removeLabel}
      </Text>
    </TouchableOpacity>
  );
};
