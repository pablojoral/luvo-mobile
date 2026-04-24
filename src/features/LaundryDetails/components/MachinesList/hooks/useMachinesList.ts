import { useCallback, useState } from 'react';
import { Laundry, Machine } from 'models/models';
import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';
import type { ListRenderItem } from 'react-native';
import { MachineCard } from 'components/MachineCard/MachineCard';

interface UseMachinesListProps {
  laundry: Laundry | null;
}

export const useMachinesList = ({ laundry }: UseMachinesListProps) => {
  const navigation = useRootStackNavigation();
  const [filter, setFilter] = useState('all');

  const machines = laundry?.machines ?? [];
  const filteredMachines = machines.filter(m => filter === 'all' || m.type === filter);

  const renderItem = useCallback<ListRenderItem<Machine>>(
    ({ item }) => (
      <MachineCard
        machine={item}
        onPress={
          item.status === 'available'
            ? () => navigation.navigate('MachineDetails', { machineId: item.id })
            : undefined
        }
      />
    ),
    [navigation],
  );

  const keyExtractor = useCallback((item: Machine) => item.id.toString(), []);

  return { filter, setFilter, filteredMachines, renderItem, keyExtractor };
};
