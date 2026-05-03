import { useCallback } from 'react';
import { Linking } from 'react-native';

import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';
import { useMyLaundries } from 'query/MyLaundries/useMyLaundries';
import { useRegisterMyLaundry } from 'query/MyLaundries/useRegisterMyLaundry';
import { useQRScanner } from 'stores/useQRScanner';
import { useMessagesStore } from 'stores/useMessagesStore';
import { parseQRCode } from 'utils/parseQRCode';
import { useQRScanHandlerStrings } from './useQRScanHandlerStrings';

export const useQRScanHandler = () => {
  const strings = useQRScanHandlerStrings();
  const navigation = useRootStackNavigation();
  const { open: openScanner } = useQRScanner();
  const { addMessage } = useMessagesStore();
  const { data: myLaundriesData } = useMyLaundries();
  const { mutate: registerMyLaundry } = useRegisterMyLaundry();

  const handleScan = useCallback(() => {
    openScanner(raw => {
      const result = parseQRCode(raw);

      switch (result.type) {
        case 'laundry': {
          navigation.navigate('LaundryDetails', { laundryId: result.laundryId });
          break;
        }

        case 'machine': {
          navigation.navigate('MachineDetails', { machineId: result.machineId });
          break;
        }

        case 'access_code': {
          const alreadyHasAccess = myLaundriesData?.laundries.some(
            l => l.accessCode === result.code,
          );

          if (alreadyHasAccess) {
            addMessage({
              title: strings.alreadyHasAccessTitle,
              body: strings.alreadyHasAccessBody,
            });
            break;
          }

          registerMyLaundry(result.code, {
            onSuccess: laundry => {
              addMessage({
                title: strings.registeredTitle,
                body: strings.registeredBody,
              });
              navigation.navigate('LaundryDetails', { laundryId: laundry.id });
            },
            onError: () =>
              addMessage({
                title: strings.invalidCodeTitle,
                body: strings.invalidCodeBody,
              }),
          });
          break;
        }

        case 'other_deeplink': {
          Linking.openURL(result.url).catch(() =>
            addMessage({
              title: strings.deeplinkUnrecognizedTitle,
              body: strings.deeplinkUnrecognizedBody,
            }),
          );
          break;
        }

        case 'unknown': {
          addMessage({
            title: strings.unknownTitle,
            body: strings.unknownBody,
          });
          break;
        }
      }
    });
  }, [strings, navigation, openScanner, addMessage, myLaundriesData, registerMyLaundry]);

  return { handleScan };
};
