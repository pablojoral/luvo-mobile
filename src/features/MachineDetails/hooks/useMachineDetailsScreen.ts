import { useCallback } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useAuthRequired } from 'hooks/useAuthRequired';
import { MachineStatus } from 'models/models';
import { RootStackParamList } from 'navigation/RootStackNavigator';
import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';
import { useLaundriesStore } from 'stores/useLaundriesStore';
import type { SurfaceColor } from '@luvo/ui';
import { toAvailabilityStatus } from 'utils/Laundry/toAvailabilityStatus';
import { useMachineDetailsStrings } from './useMachineDetailsStrings';

const STATUS_SURFACE: Record<MachineStatus, SurfaceColor> = {
  available:    'surface-status-available-subtle',
  in_use:       'surface-status-in-use-subtle',
  out_of_order: 'surface-status-out-of-order-subtle',
  maintenance:  'surface-status-maintenance-subtle',
};

export const useMachineDetailsScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'MachineDetails'>>();
  const navigation = useRootStackNavigation();
  const { machineId } = route.params;
  const {
    screenTitle, notFoundText, goBackLabel,
    startWashLabel, notifyLabel, reportProblemLabel, typeLabels,
    availabilityLabels,
  } = useMachineDetailsStrings();

  const connectionState = useLaundriesStore(s => s.connectionState);
  const machine = useLaundriesStore(s => {
    for (const l of s.laundries) {
      const m = l.machines?.find(item => item.id === machineId);
      if (m) return m;
    }
    return null;
  });
  const laundry = useLaundriesStore(s =>
    s.laundries.find(l => l.id === machine?.laundryId) ?? null,
  );

  const isConnecting = connectionState === 'idle' || connectionState === 'connecting';
  const typeLabel = machine ? typeLabels[machine.type] : '';
  const statusSurfaceColor: SurfaceColor = machine ? STATUS_SURFACE[machine.status] : 'surface-background';
  const availabilityStatus = machine ? toAvailabilityStatus(machine.status) : 'available';

  const showPay    = machine?.status === 'available';
  const showNotify = machine?.status === 'in_use';
  const cycleSeconds = machine?.cycleRemainingSeconds ?? 0;

  const { requireAuth } = useAuthRequired();

  const handleGoBack = useCallback(() => navigation.goBack(), [navigation]);

  const handleStartWash = useCallback(() => {
    requireAuth(() => {
      if (machine) navigation.navigate('Payment', { machineId: machine.id });
    })();
  }, [requireAuth, machine, navigation]);

  const handleReport = useCallback(() => {
    if (machine && laundry) {
      navigation.navigate('Report', { laundryId: laundry.id, machineId: machine.id });
    }
  }, [machine, laundry, navigation]);

  const handleNotify = useCallback(() => {
    requireAuth(() => {})();
  }, [requireAuth]);

  return {
    machine,
    laundry,
    isConnecting,
    statusSurfaceColor,
    showPay,
    showNotify,
    cycleSeconds,
    typeLabel,
    availabilityStatus,
    availabilityLabels,
    screenTitle,
    notFoundText,
    goBackLabel,
    startWashLabel,
    notifyLabel,
    reportProblemLabel,
    handleGoBack,
    handleStartWash,
    handleNotify,
    handleReport,
  };
};
