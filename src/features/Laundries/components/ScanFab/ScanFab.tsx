import { IconButton } from '@luvo/ui';

import { useScanFabTheme } from './theme/useScanFabTheme';

interface ScanFabProps {
  onPress: () => void;
}

export const ScanFab = ({ onPress }: ScanFabProps) => {
  const { styles } = useScanFabTheme();

  return (
    <IconButton iconName="QrCode" iconSize="icon-size-xl" iconColor="font-invert" onPress={onPress} style={styles.button} />
  );
};
