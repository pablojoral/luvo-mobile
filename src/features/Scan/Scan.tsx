import { IconButton } from 'components/IconButton/IconButton';
import { PillSelector } from 'components/PillSelector/PillSelector';
import { Text } from 'components/Text/Text';
import { View } from 'react-native';
import { Camera } from 'react-native-vision-camera';

import { CodeSection } from './components/CodeSection/CodeSection';
import { QRViewfinder } from './components/QRViewfinder/QRViewfinder';
import { useScanScreen } from './hooks/useScanScreen';
import { useScanTheme } from './theme/useScanTheme';

export const Scan = () => {
  const { mode, handleModeChange, modeOptions, hasPermission, codeScanner, handleCode, strings } = useScanScreen();
  const { styles, containerStyle } = useScanTheme(mode);
  const isQR = mode === 'qr';

  return (
    <View style={containerStyle}>
      {hasPermission && (
        <Camera
          style={styles.camera}
          device={Camera.getAvailableCameraDevices()[0]}
          isActive={isQR}
          codeScanner={codeScanner}
        />
      )}

      {isQR && (
        <>
          <View style={styles.dimmer} />
          <View style={styles.qrHeader}>
            <IconButton iconName="ChevronLeft" iconSize="icon-size-md" iconColor="font-invert" onPress={() => handleModeChange('manual')} style={styles.closeButton} />
          </View>
          <View style={styles.toggleRow}>
            <PillSelector
              options={modeOptions}
              value={mode}
              onChange={handleModeChange}
              backgroundColor="surface-transparent"
              thumbColor="surface-invert"
            />
          </View>
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
        </>
      )}

      {!isQR && (
        <>
          <View style={styles.manualSpacer} />
          <View style={styles.toggleRow}>
            <PillSelector
              options={modeOptions}
              value={mode}
              onChange={handleModeChange}
            />
          </View>
          <CodeSection onSubmit={handleCode} />
        </>
      )}
    </View>
  );
};
