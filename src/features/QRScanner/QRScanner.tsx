import { SvgIcon } from 'components/SvgIcon/SvgIcon';
import { SvgImage } from 'components/SvgImage/SvgImage';
import { useCameraScanner } from 'features/Scan/hooks/useCamera';
import React, { useCallback, useEffect, useRef } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Camera } from 'react-native-vision-camera';
import { useQRScanner } from 'stores/useQRScanner';
import { useQRScannerTheme } from './theme/useQRScannerTheme';

/**
 * Content is split into a separate component so the Animated.View's
 * exiting animation plays before unmount when isOpen flips to false.
 */
const QRScannerContent: React.FC = () => {
  const { styles } = useQRScannerTheme();
  const { onScan, close } = useQRScanner();
  const handledRef = useRef(false);

  const handleCodeScanned = useCallback(
    (code: string) => {
      if (handledRef.current) return;
      handledRef.current = true;
      onScan?.(code);
      close();
    },
    [onScan, close],
  );

  const { hasPermission, codeScanner } = useCameraScanner(handleCodeScanned);

  return (
    <Animated.View style={styles.overlay} entering={FadeIn} exiting={FadeOut}>
      {hasPermission && (
        <Camera
          style={styles.camera}
          device={Camera.getAvailableCameraDevices()[0]}
          isActive
          codeScanner={codeScanner}
        />
      )}
      <View style={styles.dimmer} />
      <View style={styles.targetContainer}>
        <SvgImage name="qr-target" height={180} width={180} />
      </View>
      <TouchableOpacity style={styles.closeButton} onPress={close} activeOpacity={0.7}>
        <SvgIcon name="ChevronLeft" size="font-size-xl" color="font-invert" />
      </TouchableOpacity>
    </Animated.View>
  );
};

interface QRScannerProps {
  /** When true, this instance suppresses the root-level QRScanner camera. */
  override?: boolean;
}

export const QRScanner: React.FC<QRScannerProps> = ({ override }) => {
  const isOpen = useQRScanner(s => s.isOpen);
  const hasOverridingScanner = useQRScanner(s => s.hasOverridingScanner);
  const setHasOverridingScanner = useQRScanner(s => s.setHasOverridingScanner);

  useEffect(() => {
    if (!override) return;
    setHasOverridingScanner(true);
    return () => setHasOverridingScanner(false);
  }, [override, setHasOverridingScanner]);

  // Root instance: yield to a higher-priority scanner mounted inside a modal
  if (!override && hasOverridingScanner) return null;

  return isOpen ? <QRScannerContent /> : null;
};
