import { PillSelector } from 'components/PillSelector/PillSelector';
import { SvgImage } from 'components/SvgImage/SvgImage';
import { Text } from 'components/Text/Text';
import { ScrollView, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Camera } from 'react-native-vision-camera';

import { CodeSection } from './components/CodeSection/CodeSection';
import { useScanScreen } from './hooks/useScanScreen';
import { useScanTheme } from './theme/useScanTheme';

export const Scan = () => {
  const { styles } = useScanTheme();
  const {
    options,
    selectedOption,
    setSelectedOption,
    isQrSelected,
    hasPermission,
    codeScanner,
    noAccessMessage,
  } = useScanScreen();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PillSelector
        backgroundColor={'surface-tertiary'}
        options={options}
        value={selectedOption}
        onChange={setSelectedOption}
      />
      {!hasPermission && isQrSelected && <Text>{noAccessMessage}</Text>}
      {hasPermission && isQrSelected && (
        <View style={styles.qrContainer}>
          <SvgImage name="qr-target" height={180} width={180} />
        </View>
      )}
      {hasPermission && (
        <Camera
          style={styles.camera}
          device={Camera.getAvailableCameraDevices()[0]}
          isActive={true}
          codeScanner={codeScanner}
        />
      )}

      {(!hasPermission || !isQrSelected) && (
        <Animated.View style={styles.background} entering={FadeIn} exiting={FadeOut} />
      )}
      {!isQrSelected && <CodeSection />}
    </ScrollView>
  );
};
