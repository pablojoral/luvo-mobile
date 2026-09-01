import { Text } from '@luvo/ui';
import { View } from 'react-native';
import { Camera } from 'react-native-vision-camera';

import { QRViewfinder } from './components/QRViewfinder/QRViewfinder';
import { useScanScreen } from './hooks/useScanScreen';
import { useScanTheme } from './theme/useScanTheme';

export const Scan = () => {
  const { hasPermission, codeScanner, strings } = useScanScreen();
  const { styles, containerStyle } = useScanTheme();

  return (
    <View style={containerStyle}>
      {hasPermission && (
        <Camera
          style={styles.camera}
          device={Camera.getAvailableCameraDevices()[0]}
          isActive
          codeScanner={codeScanner}
        />
      )}

      <View style={styles.dimmer} />
      <View style={styles.viewfinderRow}>
        <QRViewfinder />
      </View>
      <View style={styles.instructions}>
        <Text fontSize="font-size-lg" fontWeight="bold" color="font-invert">
          {strings.qrTitle}
        </Text>
        <Text fontSize="font-size-sm" color="font-invert" lineHeight="line-height-lg">
          {strings.qrSubtitle}
        </Text>
      </View>
    </View>
  );
};
