import { IconButton, PillSelector, SelectorOption } from '@luvo/ui';
import { View } from 'react-native';
import { useScannerHeaderTheme } from './theme/useScannerHeaderTheme';

interface ScannerHeaderProps {
  modeOptions: SelectorOption[];
  mode: string;
  onModeChange: (value: string) => void;
  onClose: () => void;
  isQR: boolean;
}

export const ScannerHeader = ({ modeOptions, mode, onModeChange, onClose, isQR }: ScannerHeaderProps) => {
  const { styles, closeButtonStyle, iconColor } = useScannerHeaderTheme(isQR);

  return (
    <>
      <View style={styles.container}>
        <IconButton iconName="Cross" iconSize="icon-size-lg" iconColor={iconColor} onPress={onClose} style={closeButtonStyle} />
      </View>
      {modeOptions.length > 1 && (
        <View style={styles.toggleRow}>
          <PillSelector
            options={modeOptions}
            value={mode}
            onChange={onModeChange}
            backgroundColor="surface-surface"
            thumbColor="surface-primary"
          />
        </View>
      )}
    </>
  );
};
