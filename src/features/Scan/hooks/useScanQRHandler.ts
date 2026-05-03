import { useCallback } from 'react';
import { Linking } from 'react-native';

import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';
import { useMessagesStore } from 'stores/useMessagesStore';
import { parseQRCode } from 'utils/parseQRCode';
import { useScanQRHandlerStrings } from './useScanQRHandlerStrings';

export const useScanQRHandler = () => {
  const strings = useScanQRHandlerStrings();
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
            title: strings.deeplinkUnrecognizedTitle,
            body: strings.deeplinkUnrecognizedBody,
          }),
        );
        break;
      case 'unknown':
        addMessage({ title: strings.unknownTitle, body: strings.unknownBody });
        break;
    }
  }, [strings, navigation, addMessage]);

  return { handleCode };
};
