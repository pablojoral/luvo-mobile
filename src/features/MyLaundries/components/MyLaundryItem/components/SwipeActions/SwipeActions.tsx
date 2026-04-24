import { SvgIcon } from 'components/SvgIcon/SvgIcon';
import { Text } from 'components/Text/Text';
import { TouchableOpacity } from 'react-native';
import { useMyLaundriesTheme } from '../../../../theme/useMyLaundriesTheme';

interface QRActionProps {
  onPress: () => void;
}

export const QRSwipeAction = ({ onPress }: QRActionProps) => {
  const { styles } = useMyLaundriesTheme();
  return (
    <TouchableOpacity style={styles.actionQR} onPress={onPress} activeOpacity={0.8}>
      <SvgIcon name="QrCode" size="font-size-xl" color="font-invert" />
      <Text fontSize="font-size-xs" color="font-invert" fontWeight="semibold">
        Ver QR
      </Text>
    </TouchableOpacity>
  );
};

interface RemoveActionProps {
  onPress: () => void;
}

export const RemoveSwipeAction = ({ onPress }: RemoveActionProps) => {
  const { styles } = useMyLaundriesTheme();
  return (
    <TouchableOpacity style={styles.actionRemove} onPress={onPress} activeOpacity={0.8}>
      <SvgIcon name="AlertCircle" size="font-size-xl" color="font-invert" />
      <Text fontSize="font-size-xs" color="font-invert" fontWeight="semibold">
        Eliminar
      </Text>
    </TouchableOpacity>
  );
};
