import React from 'react';
import { View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Camera } from 'react-native-vision-camera';
import { CodeSection } from 'features/Scan/components/CodeSection/CodeSection';
import { QRScanView } from '../QRScanView/QRScanView';
import { ScannerHeader } from '../ScannerHeader/ScannerHeader';
import { useQRScannerTheme } from '../../theme/useQRScannerTheme';
import { useQRScannerContent } from './hooks/useQRScannerContent';

/**
 * Content is split into a separate component so the Animated.View's
 * exiting animation plays before unmount when isOpen flips to false.
 */
export const QRScannerContent: React.FC = () => {
  const { hasPermission, codeScanner, close, mode, scanned, handleModeChange, handleManualCode, modeOptions, strings } = useQRScannerContent();
  const { styles } = useQRScannerTheme(mode);
  const isQR = mode === 'qr';

  return (
    <Animated.View style={styles.overlay} entering={FadeIn} exiting={FadeOut}>
      {hasPermission && isQR && (
        <Camera
          style={styles.camera}
          device={Camera.getAvailableCameraDevices()[0]}
          isActive
          codeScanner={codeScanner}
        />
      )}
      {isQR ? <View style={styles.dimmer} /> : <View style={styles.codeCover} />}

      <ScannerHeader
        modeOptions={modeOptions}
        mode={mode}
        onModeChange={handleModeChange}
        onClose={close}
        isQR={isQR}
      />

      {isQR ? (
        <QRScanView
          scanned={scanned}
          title={strings.qrTitle}
          subtitle={strings.qrSubtitle}
        />
      ) : (
        <CodeSection onSubmit={handleManualCode} />
      )}
    </Animated.View>
  );
};
