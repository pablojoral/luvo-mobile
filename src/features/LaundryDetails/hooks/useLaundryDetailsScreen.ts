import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from 'navigation/RootStackNavigator';
import { useLaundriesStore } from 'stores/useLaundriesStore';

export const useLaundryDetailsScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'LaundryDetails'>>();
  const { laundryId } = route.params;

  const laundry = useLaundriesStore(s => s.laundries.find(l => l.id === laundryId) ?? null);

  return { laundry };
};
