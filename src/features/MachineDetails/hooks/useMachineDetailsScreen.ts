import { RouteProp, useRoute } from '@react-navigation/native';
import { MachineStatus, MachineType } from 'models/models';
import { RootStackParamList } from 'navigation/RootStackNavigator';
import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';
import { useLaundriesStore } from 'stores/useLaundriesStore';
import type { IconName } from 'components/SvgIcon/types';
import type { FontColor, SurfaceColor } from 'theme/types/Theme';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('common');
  const route = useRoute<RouteProp<RootStackParamList, 'MachineDetails'>>();
  const navigation = useRootStackNavigation();
  const { machineId } = route.params;

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

  const typeLabels: Record<MachineType, string> = {
    washing_machine: t('machines.type.washing_machine'),
    dryer: t('machines.type.dryer'),
  };

  const statusLabels: Record<MachineStatus, string> = {
    available: t('machines.status.available'),
    in_use: t('machines.status.in_use'),
    out_of_order: t('machines.status.out_of_order'),
    maintenance: t('machines.status.maintenance'),
  };

  const isConnecting = connectionState === 'idle' || connectionState === 'connecting';
  const statusStyle = machine ? STATUS_COLOR[machine.status] : null;
  const isAvailable = machine?.status === 'available';
  const typeLabel = machine ? typeLabels[machine.type] : '';
  const statusLabel = machine ? statusLabels[machine.status] : '';
  const iconName: IconName = machine?.type === 'dryer' ? 'Wind' : 'Droplet';

  const screenTitle = t('machines.title');
  const notFoundText = t('machines.notFound');
  const goBackLabel = t('machines.goBack');
  const modelLabel = t('machines.model');
  const startWashLabel = t('machines.startWash');
  const reportProblemLabel = t('machines.reportProblem');

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
    screenTitle,
    notFoundText,
    goBackLabel,
    modelLabel,
    startWashLabel,
    reportProblemLabel,
    handleGoBack,
    handleStartWash,
    handleReport,
  };
};
