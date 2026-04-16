import { useEffect } from 'react';
import { useCameraPermission, useCodeScanner } from 'react-native-vision-camera';

export const useCameraScanner = () => {
  const { hasPermission, requestPermission } = useCameraPermission();

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      console.log(`Scanned ${codes.length} codes!`);
    },
  });

  return { hasPermission, codeScanner };
};
