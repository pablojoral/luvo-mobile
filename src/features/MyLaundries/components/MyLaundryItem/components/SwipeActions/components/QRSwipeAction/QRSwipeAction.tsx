import { SvgIcon, Text } from '@luvo/ui';
import { TouchableOpacity } from 'react-native';
import { useSwipeActionsStrings } from '../../hooks/useSwipeActionsStrings';
import { useQRSwipeActionTheme } from './theme/useQRSwipeActionTheme';

interface QRSwipeActionProps {
  onPress: () => void;
}

export const QRSwipeAction = ({ onPress }: QRSwipeActionProps) => {
  const { styles } = useQRSwipeActionTheme();
  const { showQRLabel } = useSwipeActionsStrings();
  return (
    <TouchableOpacity style={styles.actionQR} onPress={onPress} activeOpacity={0.8}>
      <SvgIcon name="QrCode" size="icon-size-md" color="font-invert" />
      <Text fontSize="font-size-xs" color="font-invert" fontWeight="semibold">
        {showQRLabel}
      </Text>
    </TouchableOpacity>
  );
};
