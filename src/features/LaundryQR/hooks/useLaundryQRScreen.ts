import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from 'navigation/RootStackNavigator';
import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';
import { useTranslation } from 'react-i18next';

export const useLaundryQRScreen = () => {
  const { t } = useTranslation('common');
  const route = useRoute<RouteProp<RootStackParamList, 'LaundryQR'>>();
  const navigation = useRootStackNavigation();
  const { accessCode, laundryName } = route.params;

  const handleGoBack = () => navigation.goBack();

  return {
    shareHint: t('laundryQR.shareHint'),
    accessCode,
    laundryName,
    handleGoBack,
  };
};
