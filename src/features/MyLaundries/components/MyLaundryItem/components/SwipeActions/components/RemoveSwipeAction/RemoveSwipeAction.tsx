import { SvgIcon } from 'components/SvgIcon/SvgIcon';
import { Text } from 'components/Text/Text';
import { TouchableOpacity } from 'react-native';
import { useMyLaundriesTheme } from '../../../../../../theme/useMyLaundriesTheme';
import { useSwipeActions } from '../../hooks/useSwipeActions';

interface RemoveSwipeActionProps {
  onPress: () => void;
}

export const RemoveSwipeAction = ({ onPress }: RemoveSwipeActionProps) => {
  const { styles } = useMyLaundriesTheme();
  const { removeLabel } = useSwipeActions();
  return (
    <TouchableOpacity style={styles.actionRemove} onPress={onPress} activeOpacity={0.8}>
      <SvgIcon name="AlertCircle" size="font-size-xl" color="font-invert" />
      <Text fontSize="font-size-xs" color="font-invert" fontWeight="semibold">
        {removeLabel}
      </Text>
    </TouchableOpacity>
  );
};
