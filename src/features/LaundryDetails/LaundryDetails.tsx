import { LaundryDetailsHero } from 'features/LaundryDetails/components/LaundryDetailsHero/LaundryDetailsHero';
import { MachinesList } from 'features/LaundryDetails/components/MachinesList/MachineList';
import { View } from 'react-native';

import { useLaundryDetailsScreen } from './hooks/useLaundryDetailsScreen';
import { useLaundryDetailsTheme } from './theme/useLaundryDetailsTheme';

export const LaundryDetails = () => {
  const { styles } = useLaundryDetailsTheme();
  const { laundry } = useLaundryDetailsScreen();

  return (
    <View style={styles.container}>
      <LaundryDetailsHero laundry={laundry} />
      <MachinesList laundry={laundry} />
    </View>
  );
};
