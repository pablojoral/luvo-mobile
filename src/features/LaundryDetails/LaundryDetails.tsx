import { ScreenHeader } from 'components/ScreenHeader/ScreenHeader';
import { LaundryDetailsCard } from 'features/LaundryDetails/components/LaundryDetailsCard/LaundryDetailsCard';
import { MachinesList } from 'features/LaundryDetails/components/MachinesList/MachineList';
import { View } from 'react-native';

import { useLaundryDetailsScreen } from './hooks/useLaundryDetailsScreen';
import { useLaundryDetailsTheme } from './theme/useLaundryDetailsTheme';

export const LaundryDetails = () => {
  const { styles } = useLaundryDetailsTheme();
  const { laundry, handleGoBack } = useLaundryDetailsScreen();

  return (
    <View style={styles.container}>
      <ScreenHeader title={'Lavandería'} onBack={handleGoBack} />
      <View style={styles.content}>
        <LaundryDetailsCard laundry={laundry} />
        <MachinesList laundry={laundry} />
      </View>
    </View>
  );
};
