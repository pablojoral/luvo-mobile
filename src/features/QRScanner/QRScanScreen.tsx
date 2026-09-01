import { PillSelector } from '@luvo/ui';
import { View } from 'react-native';
import { Camera } from 'react-native-vision-camera';

import { QRScanView } from './components/QRScanView/QRScanView';
import { useQRScanScreen } from './hooks/useQRScanScreen';
import { useQRScanScreenTheme } from './theme/useQRScanScreenTheme';

export const QRScanScreen = () => {
  const { hasPermission, codeScanner, isFocused, scanned, mode, modeOptions, handleModeChange, strings } =
    useQRScanScreen();
  const { styles } = useQRScanScreenTheme(mode);
  const isQR = mode === 'qr';

  return (
    <View style={styles.container}>
      {hasPermission && isQR && (
        <Camera
          style={styles.camera}
          device={Camera.getAvailableCameraDevices()[0]}
          isActive={isFocused}
          codeScanner={codeScanner}
        />
      )}

      <View style={styles.dimmer} />

      {modeOptions.length > 1 && (
        <View style={styles.toggleRow}>
          <PillSelector
            options={modeOptions}
            value={mode}
            onChange={handleModeChange}
            backgroundColor="surface-surface"
            thumbColor="surface-primary"
          />
        </View>
      )}
      <QRScanView scanned={scanned} title={strings.qrTitle} subtitle={strings.qrSubtitle} />
    </View>
  );
};
