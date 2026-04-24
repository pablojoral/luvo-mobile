import { PillSelector, SelectorOption } from 'components/PillSelector/PillSelector';
import { Separator } from 'components/Separator/Separator';
import { Laundry } from 'models/models';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';

import { useMachinesList } from './hooks/useMachinesList';
import { useMachinesListTheme } from './theme/useMachinesListTheme';

const options: SelectorOption[] = [
  { label: 'Todas', value: 'all' },
  { label: 'Lavadoras', value: 'washing_machine' },
  { label: 'Secadoras', value: 'dryer' },
];

interface MachinesListProps {
  laundry: Laundry | null;
}

export const MachinesList = ({ laundry }: MachinesListProps) => {
  const { styles } = useMachinesListTheme();
  const { filter, setFilter, filteredMachines, renderItem, keyExtractor } = useMachinesList({ laundry });

  return (
    <View style={styles.containerStyle}>
      <View style={styles.typeSelectorContainer}>
        <PillSelector options={options} value={filter} onChange={setFilter} />
      </View>
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
