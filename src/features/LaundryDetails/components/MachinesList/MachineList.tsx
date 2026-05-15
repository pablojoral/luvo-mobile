import { PillSelector, Separator } from '@luvo/ui';
import { Laundry } from 'models/models';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';

import { useMachinesList } from './hooks/useMachinesList';
import { useMachinesListTheme } from './theme/useMachinesListTheme';

interface MachinesListProps {
  laundry: Laundry | null;
}

export const MachinesList = ({ laundry }: MachinesListProps) => {
  const { styles } = useMachinesListTheme();
  const { filter, setFilter, filterOptions, filteredMachines, renderItem, keyExtractor } = useMachinesList({ laundry });

  return (
    <View style={styles.containerStyle}>
      <PillSelector
        options={filterOptions}
        value={filter}
        onChange={setFilter}
        backgroundColor="surface-surface"
        thumbColor="surface-primary"
      />
      <Animated.FlatList
        data={filteredMachines}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={Separator}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContentContainerStyle}
      />
    </View>
  );
};
