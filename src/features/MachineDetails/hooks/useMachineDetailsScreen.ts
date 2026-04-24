import { RouteProp, useRoute } from '@react-navigation/native';
import { MachineStatus, MachineType } from 'models/models';
import { RootStackParamList } from 'navigation/RootStackNavigator';
import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';
import { useLaundriesStore } from 'stores/useLaundriesStore';
import type { FontColor, SurfaceColor } from 'theme/types/Theme';

const TYPE_LABEL: Record<MachineType, string> = {
  washing_machine: 'Lavadora',
  dryer: 'Secadora',
};

const STATUS_LABEL: Record<MachineStatus, string> = {
  available: 'Disponible',
  in_use: 'En uso',
  out_of_order: 'Fuera de servicio',
  maintenance: 'Mantenimiento',
};

interface StatusColorEntry {
  color: FontColor;
  surfaceColor: SurfaceColor;
}

const STATUS_COLOR: Record<MachineStatus, StatusColorEntry> = {
  available:    { color: 'font-success',   surfaceColor: 'surface-success' },
  in_use:       { color: 'font-warning',   surfaceColor: 'surface-warning' },
  out_of_order: { color: 'font-error',     surfaceColor: 'surface-error' },
  maintenance:  { color: 'font-warning',   surfaceColor: 'surface-warning' },
};

export const useMachineDetailsScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'MachineDetails'>>();
  const navigation = useRootStackNavigation();
  const { machineId } = route.params;

  const connectionState = useLaundriesStore(s => s.connectionState);
  const machine = useLaundriesStore(s => {
    for (const l of s.laundries) {
      const m = l.machines?.find(m => m.id === machineId);
      if (m) return m;
    }
    return null;
  });
  const laundry = useLaundriesStore(s =>
    s.laundries.find(l => l.id === machine?.laundryId) ?? null,
  );

  const isConnecting = connectionState === 'idle' || connectionState === 'connecting';
  const statusStyle = machine ? STATUS_COLOR[machine.status] : null;
  const isAvailable = machine?.status === 'available';
  const typeLabel = machine ? TYPE_LABEL[machine.type] : '';
  const statusLabel = machine ? STATUS_LABEL[machine.status] : '';
  const iconName = machine?.type === 'dryer' ? 'Wind' : 'Droplet';

  const handleGoBack = () => navigation.goBack();
  const handleStartWash = () => {
    if (machine) navigation.navigate('Payment', { machineId: machine.id });
  };
  const handleReport = () => {
    if (machine && laundry) {
      navigation.navigate('Report', { laundryId: laundry.id, machineId: machine.id });
    }
  };

  return {
    machine,
    laundry,
    isConnecting,
    statusStyle,
    isAvailable,
    typeLabel,
    statusLabel,
    iconName,
    handleGoBack,
    handleStartWash,
    handleReport,
  };
};
