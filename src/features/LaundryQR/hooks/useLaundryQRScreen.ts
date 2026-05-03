import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from 'navigation/RootStackNavigator';
import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';
import { useLaundryQRScreenStrings } from './useLaundryQRScreenStrings';

export const useLaundryQRScreen = () => {
  const { shareHint } = useLaundryQRScreenStrings();
  const route = useRoute<RouteProp<RootStackParamList, 'LaundryQR'>>();
  const navigation = useRootStackNavigation();
  const { accessCode, laundryName } = route.params;

  const handleGoBack = () => navigation.goBack();

  return {
    shareHint,
    accessCode,
    laundryName,
    handleGoBack,
  };
};
