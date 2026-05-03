import { SvgIcon } from 'components/SvgIcon/SvgIcon';
import { SvgImage } from 'components/SvgImage/SvgImage';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Camera } from 'react-native-vision-camera';
import { useQRScannerTheme } from '../../theme/useQRScannerTheme';
import { useQRScannerContent } from './hooks/useQRScannerContent';

/**
 * Content is split into a separate component so the Animated.View's
 * exiting animation plays before unmount when isOpen flips to false.
 */
export const QRScannerContent: React.FC = () => {
  const { styles } = useQRScannerTheme();
  const { hasPermission, codeScanner, close } = useQRScannerContent();

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
        <SvgIcon name="ChevronLeft" size="icon-size-md" color="font-invert" />
      </TouchableOpacity>
    </Animated.View>
  );
};
