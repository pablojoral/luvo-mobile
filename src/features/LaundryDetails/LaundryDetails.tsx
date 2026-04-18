import { ScreenHeader } from 'components/ScreenHeader/ScreenHeader';
import { LaundryDetailsCard } from 'features/LaundryDetailsModal/components/LaundryDetailsCard/LaundryDetailsCard';
import { MachinesList } from 'features/LaundryDetailsModal/components/MachinesList/MachineList';
import { RootStackParamList } from 'navigation/RootStackNavigator';
import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';
import { View } from 'react-native';
import { useLaundriesStore } from 'stores/useLaundriesStore';

import { RouteProp, useRoute } from '@react-navigation/native';

import { useLaundryDetailsTheme } from './theme/useLaundryDetailsTheme';

export const LaundryDetails = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'LaundryDetails'>>();
  const navigation = useRootStackNavigation();
  const { laundryId } = route.params;
  const { styles } = useLaundryDetailsTheme();

  const laundry = useLaundriesStore(s => s.laundries.find(l => l.id === laundryId) ?? null);

  return (
    <View style={styles.container}>
      <ScreenHeader title={'Lavandería'} onBack={() => navigation.goBack()} />
      <View style={styles.content}>
        <LaundryDetailsCard laundry={laundry} />
        <MachinesList laundry={laundry} />
      </View>
    </View>
  );
};
