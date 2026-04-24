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

export const useQRScanHandler = () => {
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
              title: 'Ya tienes acceso',
              body: 'Ya estás asociado a la lavandería privada de este código.',
            });
            break;
          }

          registerMyLaundry(result.code, {
            onSuccess: () =>
              addMessage({
                title: '¡Listo!',
                body: 'Has sido asociado a la lavandería privada exitosamente.',
              }),
            onError: () =>
              addMessage({
                title: 'Código inválido',
                body: 'El código de acceso no es válido o ha expirado.',
              }),
          });
          break;
        }

        case 'laundry': {
          const laundry = laundries.find(l => l.id === result.laundryId);

          if (!laundry || laundry.visibility === 'private') {
            addMessage({
              title: 'Lavandería privada',
              body: 'Esta lavandería es privada. Necesitas un código de acceso para agregarla. Pídelo al administrador del local.',
            });
            break;
          }

          const alreadyAdded = myLaundriesData?.laundries.some(l => l.id === result.laundryId);
          if (alreadyAdded) {
            addMessage({ body: 'Esta lavandería ya está en tu lista.' });
            break;
          }

          addMyLaundry(result.laundryId, {
            onSuccess: () =>
              addMessage({
                title: '¡Listo!',
                body: 'La lavandería se ha agregado a tu lista.',
              }),
            onError: () =>
              addMessage({
                title: 'No se pudo agregar',
                body: 'Ocurrió un error al agregar la lavandería. Inténtalo de nuevo.',
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
  }, [navigation, openScanner, addMessage, laundries, myLaundriesData, addMyLaundry, registerMyLaundry]);

  return { handleScan };
};
