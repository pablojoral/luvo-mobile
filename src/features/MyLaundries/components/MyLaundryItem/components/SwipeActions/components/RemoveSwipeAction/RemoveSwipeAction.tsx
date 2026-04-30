import { SvgIcon } from 'components/SvgIcon/SvgIcon';
import { Text } from 'components/Text/Text';
import { TouchableOpacity } from 'react-native';
import { useSwipeActions } from '../../hooks/useSwipeActions';
import { useRemoveSwipeActionTheme } from './theme/useRemoveSwipeActionTheme';

interface RemoveSwipeActionProps {
  onPress: () => void;
}

export const RemoveSwipeAction = ({ onPress }: RemoveSwipeActionProps) => {
  const { styles } = useRemoveSwipeActionTheme();
  const { removeLabel } = useSwipeActions();
  return (
    <TouchableOpacity style={styles.actionRemove} onPress={onPress} activeOpacity={0.8}>
      <SvgIcon name="AlertCircle" size="icon-size-md" color="font-invert" />
      <Text fontSize="font-size-xs" color="font-invert" fontWeight="semibold">
        {removeLabel}
      </Text>
    </TouchableOpacity>
  );
};
