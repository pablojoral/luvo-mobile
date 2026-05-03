import { useCallback } from 'react';
import { Linking } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';
import { useMessagesStore } from 'stores/useMessagesStore';
import { parseQRCode } from 'utils/parseQRCode';

export const useScanQRHandler = () => {
  const { t } = useTranslation('common');
  const navigation = useRootStackNavigation();
  const { addMessage } = useMessagesStore();

  const handleCode = useCallback((raw: string) => {
    const result = parseQRCode(raw);

    switch (result.type) {
      case 'laundry':
        navigation.navigate('LaundryDetails', { laundryId: result.laundryId });
        break;
      case 'machine':
        navigation.navigate('MachineDetails', { machineId: result.machineId });
        break;
      case 'access_code':
        navigation.navigate('RegisterLaundry', { code: result.code });
        break;
      case 'other_deeplink':
        Linking.openURL(result.url).catch(() =>
          addMessage({
            title: t('qr.deeplink.unrecognized.title'),
            body: t('qr.deeplink.unrecognized.body'),
          }),
        );
        break;
      case 'unknown':
        addMessage({ title: t('qr.unknown.title'), body: t('qr.unknown.body') });
        break;
    }
  }, [t, navigation, addMessage]);

  return { handleCode };
};
