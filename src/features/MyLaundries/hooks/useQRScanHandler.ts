import { useCallback } from 'react';
import { Linking } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';
import { useAddMyLaundry } from 'query/MyLaundries/useAddMyLaundry';
import { useMyLaundries } from 'query/MyLaundries/useMyLaundries';
import { useRegisterMyLaundry } from 'query/MyLaundries/useRegisterMyLaundry';
import { useLaundriesStore } from 'stores/useLaundriesStore';
import { useMessagesStore } from 'stores/useMessagesStore';
import { useQRScanner } from 'stores/useQRScanner';
import { parseQRCode } from 'utils/parseQRCode';

export const useQRScanHandler = () => {
  const { t } = useTranslation('common');
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
              title: t('qr.alreadyHasAccess.title'),
              body: t('qr.alreadyHasAccess.body'),
            });
            break;
          }

          registerMyLaundry(result.code, {
            onSuccess: () =>
              addMessage({
                title: t('qr.registered.title'),
                body: t('qr.registered.body'),
              }),
            onError: () =>
              addMessage({
                title: t('qr.invalidCode.title'),
                body: t('qr.invalidCode.body'),
              }),
          });
          break;
        }

        case 'laundry': {
          const laundry = laundries.find(l => l.id === result.laundryId);

          if (!laundry || laundry.visibility === 'private') {
            addMessage({
              title: t('qr.privateLaundry.title'),
              body: t('qr.privateLaundry.body'),
            });
            break;
          }

          const alreadyAdded = myLaundriesData?.laundries.some(l => l.id === result.laundryId);
          if (alreadyAdded) {
            addMessage({ body: t('qr.alreadyAdded.body') });
            break;
          }

          addMyLaundry(result.laundryId, {
            onSuccess: () =>
              addMessage({
                title: t('qr.added.title'),
                body: t('qr.added.body'),
              }),
            onError: () =>
              addMessage({
                title: t('qr.addFailed.title'),
                body: t('qr.addFailed.body'),
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
  }, [t, navigation, openScanner, addMessage, laundries, myLaundriesData, addMyLaundry, registerMyLaundry]);

  return { handleScan };
};
