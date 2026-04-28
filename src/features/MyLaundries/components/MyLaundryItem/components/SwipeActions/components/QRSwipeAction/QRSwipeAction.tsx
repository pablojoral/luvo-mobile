import { SvgIcon } from 'components/SvgIcon/SvgIcon';
import { Text } from 'components/Text/Text';
import { TouchableOpacity } from 'react-native';
import { useSwipeActions } from '../../hooks/useSwipeActions';
import { useQRSwipeActionTheme } from './theme/useQRSwipeActionTheme';

interface QRSwipeActionProps {
  onPress: () => void;
}

export const QRSwipeAction = ({ onPress }: QRSwipeActionProps) => {
  const { styles } = useQRSwipeActionTheme();
  const { showQRLabel } = useSwipeActions();
  return (
    <TouchableOpacity style={styles.actionQR} onPress={onPress} activeOpacity={0.8}>
      <SvgIcon name="QrCode" size="font-size-xl" color="font-invert" />
      <Text fontSize="font-size-xs" color="font-invert" fontWeight="semibold">
        {showQRLabel}
      </Text>
    </TouchableOpacity>
  );
};
