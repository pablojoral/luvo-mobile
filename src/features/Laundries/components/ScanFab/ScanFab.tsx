import { SvgIcon } from 'components/SvgIcon/SvgIcon';
import { TouchableOpacity } from 'react-native';

import { useScanFabTheme } from './theme/useScanFabTheme';

interface ScanFabProps {
  onPress: () => void;
}

export const ScanFab = ({ onPress }: ScanFabProps) => {
  const { styles } = useScanFabTheme();

  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
      <SvgIcon name="QrCode" size="icon-size-xl" color="font-invert" />
    </TouchableOpacity>
  );
};
