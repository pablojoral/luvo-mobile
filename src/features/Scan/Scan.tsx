import { PillSelector, SelectorOption } from 'components/PillSelector/PillSelector';
import { SvgImage } from 'components/SvgImage/SvgImage';
import { Text } from 'components/Text/Text';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Camera } from 'react-native-vision-camera';

import { CodeSection } from './components/CodeSection/CodeSection';
import { useCameraScanner } from './hooks/useCamera';
import { useScanTheme } from './theme/useScanTheme';

const options: SelectorOption[] = [
  { label: 'Escanear QR', value: 'qr' },
  { label: 'Código', value: 'code' },
];

export const Scan = () => {
  const { styles } = useScanTheme();

  const [selectedOption, setSelectedOption] = useState<string>('qr');
  const isQrSelected = selectedOption === 'qr';

  const { hasPermission, codeScanner } = useCameraScanner();

  const noAccessMessage =
    'No has habilitado el acceso a la cámara. Por favor, habilítalo en la configuración de tu dispositivo.';

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
