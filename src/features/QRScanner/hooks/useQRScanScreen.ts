import { useCallback, useRef, useState } from 'react';
import { Linking, Vibration } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useCameraScanner } from 'features/Scan/hooks/useCamera';
import { useScanStrings } from 'features/Scan/hooks/useScanStrings';
import { useQRScanHandlerStrings } from 'features/Laundries/hooks/useQRScanHandlerStrings';
import { useAuthRequired } from 'hooks/useAuthRequired';
import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';
import { useMyLaundries } from 'query/MyLaundries/useMyLaundries';
import { useRegisterMyLaundry } from 'query/MyLaundries/useRegisterMyLaundry';
import { useMessagesStore } from 'stores/useMessagesStore';
import { parseQRCode } from 'utils/parseQRCode';
import type { ScannerMode } from '../components/QRScannerContent/hooks/useQRScannerContent';
import type { SelectorOption } from '@luvo/ui';

const SCAN_RESET_MS = 1_500;

export const useQRScanScreen = () => {
  const navigation = useRootStackNavigation();
  const { addMessage } = useMessagesStore();
  const { data: myLaundriesData } = useMyLaundries();
  const { mutate: registerMyLaundry } = useRegisterMyLaundry();
  const { requireAuth } = useAuthRequired();
  const isFocused = useIsFocused();
  const handledRef = useRef(false);
  const [scanned, setScanned] = useState(false);
  const [mode, setMode] = useState<ScannerMode>('qr');
  const strings = useScanStrings('general');
  const handlerStrings = useQRScanHandlerStrings();

  const resetScan = useCallback(() => {
    setTimeout(() => {
      handledRef.current = false;
      setScanned(false);
    }, SCAN_RESET_MS);
  }, []);

  const handleCodeScanned = useCallback(
    (raw: string) => {
      if (handledRef.current) return;
      handledRef.current = true;
      setScanned(true);
      Vibration.vibrate();

      const result = parseQRCode(raw);

      switch (result.type) {
        case 'laundry':
          navigation.navigate('LaundryDetails', { laundryId: result.laundryId });
          resetScan();
          break;

        case 'machine':
          navigation.navigate('MachineDetails', { machineId: result.machineId });
          resetScan();
          break;

        case 'access_code':
          requireAuth(() => {
            const alreadyHasAccess = myLaundriesData?.laundries.some(l => l.accessCode === result.code);
            if (alreadyHasAccess) {
              addMessage({ title: handlerStrings.alreadyHasAccessTitle, body: handlerStrings.alreadyHasAccessBody });
              resetScan();
              return;
            }
            registerMyLaundry(result.code, {
              onSuccess: laundry => {
                addMessage({ title: handlerStrings.registeredTitle, body: handlerStrings.registeredBody });
                navigation.navigate('LaundryDetails', { laundryId: laundry.id });
                resetScan();
              },
              onError: () => {
                addMessage({ title: handlerStrings.invalidCodeTitle, body: handlerStrings.invalidCodeBody });
                resetScan();
              },
            });
          })();
          break;

        case 'other_deeplink':
          Linking.openURL(result.url).catch(() =>
            addMessage({
              title: handlerStrings.deeplinkUnrecognizedTitle,
              body: handlerStrings.deeplinkUnrecognizedBody,
            }),
          );
          resetScan();
          break;

        default:
          addMessage({ title: handlerStrings.unknownTitle, body: handlerStrings.unknownBody });
          resetScan();
      }
    },
    [navigation, addMessage, myLaundriesData, registerMyLaundry, requireAuth, resetScan, handlerStrings],
  );

  const { hasPermission, codeScanner } = useCameraScanner(handleCodeScanned);

  const modeOptions: SelectorOption[] = strings.showCodeTab
    ? [
        { label: strings.modeCode, value: 'manual' },
        { label: strings.modeQR, value: 'qr' },
      ]
    : [];

  const handleModeChange = useCallback((value: string) => {
    const newMode = value as ScannerMode;
    if (newMode === 'qr') {
      handledRef.current = false;
      setScanned(false);
    }
    setMode(newMode);
  }, []);

  return {
    hasPermission,
    codeScanner,
    isFocused,
    scanned,
    mode,
    modeOptions,
    handleModeChange,
    strings,
  };
};
