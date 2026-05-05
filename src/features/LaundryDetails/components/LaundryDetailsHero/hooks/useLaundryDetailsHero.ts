import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from 'navigation/RootStackNavigator';
import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';
import { useMyLaundriesButton } from 'query/MyLaundries/useMyLaundriesButton';
import { useLaundriesStore } from 'stores/useLaundriesStore';

export const useLaundryDetailsHero = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'LaundryDetails'>>();
  const navigation = useRootStackNavigation();
  const { laundryId } = route.params;

  const visibility = useLaundriesStore(s => s.laundries.find(l => l.id === laundryId)?.visibility);
  const myLaundriesButton = useMyLaundriesButton(laundryId);

  const showFavorite = visibility === 'public' && myLaundriesButton.isAuthenticated;
  const handleGoBack = () => navigation.goBack();

  return { handleGoBack, myLaundriesButton, showFavorite };
};
