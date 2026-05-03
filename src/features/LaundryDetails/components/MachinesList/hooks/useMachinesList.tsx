import { useCallback, useState } from 'react';
import { Laundry, Machine } from 'models/models';
import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';
import type { ListRenderItem } from 'react-native';
import { MachineCard } from 'components/MachineCard/MachineCard';
import type { SelectorOption } from 'components/PillSelector/PillSelector';
import { useMachinesListStrings } from './useMachinesListStrings';

interface UseMachinesListProps {
  laundry: Laundry | null;
}

export const useMachinesList = ({ laundry }: UseMachinesListProps) => {
  const { filterAll, filterWashingMachine, filterDryer } = useMachinesListStrings();
  const navigation = useRootStackNavigation();
  const [filter, setFilter] = useState('all');

  const filterOptions: SelectorOption[] = [
    { label: filterAll, value: 'all' },
    { label: filterWashingMachine, value: 'washing_machine' },
    { label: filterDryer, value: 'dryer' },
  ];

  const machines = laundry?.machines ?? [];
  const filteredMachines = machines.filter(m => filter === 'all' || m.type === filter);

  const renderItem = useCallback<ListRenderItem<Machine>>(
    ({ item }) => (
      <MachineCard
        machine={item}
        onPress={() => navigation.navigate('MachineDetails', { machineId: item.id })}
      />
    ),
    [navigation],
  );

  const keyExtractor = useCallback((item: Machine) => item.id.toString(), []);

  return { filter, setFilter, filterOptions, filteredMachines, renderItem, keyExtractor };
};
