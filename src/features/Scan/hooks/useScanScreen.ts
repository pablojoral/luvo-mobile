import { useCameraScanner } from './useCamera';
import { useScanQRHandler } from './useScanQRHandler';
import { useScanStrings } from './useScanStrings';

export const useScanScreen = () => {
  const strings = useScanStrings();
  const { handleCode } = useScanQRHandler();

  const { hasPermission, codeScanner } = useCameraScanner(handleCode);

  return {
    hasPermission,
    codeScanner,
    strings,
  };
};
