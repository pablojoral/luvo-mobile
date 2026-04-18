import { useEffect } from 'react';
import { useCameraPermission, useCodeScanner } from 'react-native-vision-camera';

export const useCameraScanner = (onCodeScanned: (code: string) => void) => {
  const { hasPermission, requestPermission } = useCameraPermission();

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      const value = codes[0]?.value;
      if (value) onCodeScanned(value);
    },
  });

  return { hasPermission, codeScanner };
};
