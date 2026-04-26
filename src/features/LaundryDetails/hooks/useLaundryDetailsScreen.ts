import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from 'navigation/RootStackNavigator';
import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';
import { useLaundriesStore } from 'stores/useLaundriesStore';
import { useTranslation } from 'react-i18next';

export const useLaundryDetailsScreen = () => {
  const { t } = useTranslation('common');
  const route = useRoute<RouteProp<RootStackParamList, 'LaundryDetails'>>();
  const navigation = useRootStackNavigation();
  const { laundryId } = route.params;

  const laundry = useLaundriesStore(s => s.laundries.find(l => l.id === laundryId) ?? null);

  const screenTitle = t('laundry.title');

  const handleGoBack = () => navigation.goBack();

  return { laundry, screenTitle, handleGoBack };
};
