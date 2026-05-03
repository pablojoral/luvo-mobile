import { useCallback } from 'react';
import { Linking } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';
import { useMyLaundries } from 'query/MyLaundries/useMyLaundries';
import { useRegisterMyLaundry } from 'query/MyLaundries/useRegisterMyLaundry';
import { useQRScanner } from 'stores/useQRScanner';
import { useMessagesStore } from 'stores/useMessagesStore';
import { parseQRCode } from 'utils/parseQRCode';

export const useQRScanHandler = () => {
  const { t } = useTranslation('common');
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
              title: t('qr.alreadyHasAccess.title'),
              body: t('qr.alreadyHasAccess.body'),
            });
            break;
          }

          registerMyLaundry(result.code, {
            onSuccess: laundry => {
              addMessage({
                title: t('qr.registered.title'),
                body: t('qr.registered.body'),
              });
              navigation.navigate('LaundryDetails', { laundryId: laundry.id });
            },
            onError: () =>
              addMessage({
                title: t('qr.invalidCode.title'),
                body: t('qr.invalidCode.body'),
              }),
          });
          break;
        }

        case 'other_deeplink': {
          Linking.openURL(result.url).catch(() =>
            addMessage({
              title: t('qr.deeplink.unrecognized.title'),
              body: t('qr.deeplink.unrecognized.body'),
            }),
          );
          break;
        }

        case 'unknown': {
          addMessage({
            title: t('qr.unknown.title'),
            body: t('qr.unknown.body'),
          });
          break;
        }
      }
    });
  }, [t, navigation, openScanner, addMessage, myLaundriesData, registerMyLaundry]);

  return { handleScan };
};
