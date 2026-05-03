import { useCallback } from 'react';
import { Linking } from 'react-native';

import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';
import { useAddMyLaundry } from 'query/MyLaundries/useAddMyLaundry';
import { useMyLaundries } from 'query/MyLaundries/useMyLaundries';
import { useRegisterMyLaundry } from 'query/MyLaundries/useRegisterMyLaundry';
import { useLaundriesStore } from 'stores/useLaundriesStore';
import { useMessagesStore } from 'stores/useMessagesStore';
import { useQRScanner } from 'stores/useQRScanner';
import { parseQRCode } from 'utils/parseQRCode';
import { useQRScanHandlerStrings } from './useQRScanHandlerStrings';

export const useQRScanHandler = () => {
  const strings = useQRScanHandlerStrings();
  const navigation = useRootStackNavigation();
  const { open: openScanner } = useQRScanner();
  const { addMessage } = useMessagesStore();
  const laundries = useLaundriesStore(s => s.laundries);
  const { data: myLaundriesData } = useMyLaundries();
  const { mutate: addMyLaundry } = useAddMyLaundry();
  const { mutate: registerMyLaundry } = useRegisterMyLaundry();

  const handleScan = useCallback(() => {
    openScanner(raw => {
      const result = parseQRCode(raw);

      switch (result.type) {
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
            onSuccess: () =>
              addMessage({
                title: strings.registeredTitle,
                body: strings.registeredBody,
              }),
            onError: () =>
              addMessage({
                title: strings.invalidCodeTitle,
                body: strings.invalidCodeBody,
              }),
          });
          break;
        }

        case 'laundry': {
          const laundry = laundries.find(l => l.id === result.laundryId);

          if (!laundry || laundry.visibility === 'private') {
            addMessage({
              title: strings.privateLaundryTitle,
              body: strings.privateLaundryBody,
            });
            break;
          }

          const alreadyAdded = myLaundriesData?.laundries.some(l => l.id === result.laundryId);
          if (alreadyAdded) {
            addMessage({ body: strings.alreadyAddedBody });
            break;
          }

          addMyLaundry(result.laundryId, {
            onSuccess: () =>
              addMessage({
                title: strings.addedTitle,
                body: strings.addedBody,
              }),
            onError: () =>
              addMessage({
                title: strings.addFailedTitle,
                body: strings.addFailedBody,
              }),
          });
          break;
        }

        case 'machine': {
          navigation.navigate('MachineDetails', { machineId: result.machineId });
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
  }, [strings, navigation, openScanner, addMessage, laundries, myLaundriesData, addMyLaundry, registerMyLaundry]);

  return { handleScan };
};
