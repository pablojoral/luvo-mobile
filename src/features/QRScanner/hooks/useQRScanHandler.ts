import { useCallback } from 'react';
import { Linking } from 'react-native';

import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';
import { useMyLaundries } from 'query/MyLaundries/useMyLaundries';
import { useRegisterMyLaundry } from 'query/MyLaundries/useRegisterMyLaundry';
import { useQRScanner } from 'stores/useQRScanner';
import { useMessagesStore } from 'stores/useMessagesStore';
import { parseQRCode } from 'utils/parseQRCode';

export const useQRScanHandler = () => {
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
              title: 'Ya tienes acceso',
              body: 'Ya estás asociado a la lavandería de este código.',
            });
            break;
          }

          registerMyLaundry(result.code, {
            onSuccess: laundry => {
              addMessage({
                title: '¡Listo!',
                body: 'Has sido asociado a la lavandería exitosamente.',
              });
              navigation.navigate('LaundryDetails', { laundryId: laundry.id });
            },
            onError: () =>
              addMessage({
                title: 'Código inválido',
                body: 'El código de acceso no es válido o ha expirado.',
              }),
          });
          break;
        }

        case 'other_deeplink': {
          Linking.openURL(result.url).catch(() =>
            addMessage({
              title: 'Enlace no reconocido',
              body: 'No se pudo abrir el enlace asociado a este código QR.',
            }),
          );
          break;
        }

        case 'unknown': {
          addMessage({
            title: 'QR no reconocido',
            body: 'Este código QR no es compatible con Luvo.',
          });
          break;
        }
      }
    });
  }, [navigation, openScanner, addMessage, myLaundriesData, registerMyLaundry]);

  return { handleScan };
};
