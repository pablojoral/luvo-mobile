import { useTranslation } from 'react-i18next';
import { useLaundriesStore } from 'stores/useLaundriesStore';
import { toAvailabilityStatus } from 'utils/Laundry/toAvailabilityStatus';
import { usePayment } from './usePayment';
import { usePaymentStrings } from './usePaymentStrings';

interface UsePaymentScreenParams {
  machineId: number;
}

export function usePaymentScreen({ machineId }: UsePaymentScreenParams) {
  const machine = useLaundriesStore(
    s => s.laundries.flatMap(l => l.machines ?? []).find(m => m.id === machineId) ?? null,
  );
  const laundry = useLaundriesStore(
    s => s.laundries.find(l => l.machines?.some(m => m.id === machineId)) ?? null,
  );

  const {
    strategies,
    selectedStrategy,
    setSelectedStrategy,
    selectedProgram,
    setSelectedProgram,
    programs,
    coinCosts,
    programsLoading,
    paymentState,
    progressCode,
    result,
    execute,
    reset,
  } = usePayment(machineId);

  const isLoading = paymentState === 'loading';
  const isSuccess = paymentState === 'success';
  const isError   = paymentState === 'error';

  const strings = usePaymentStrings(progressCode, result?.error);
  const { t }   = useTranslation('common');

  const availabilityStatus = machine ? toAvailabilityStatus(machine.status) : 'available';
  const machineLabel = machine
    ? `${strings.typeLabels[machine.type]} #${machine.number}`
    : '';

  const sortedPrograms = [...programs].sort((a, b) => a.coins - b.coins);

  const programOptions = sortedPrograms.map(p => {
    const cost     = coinCosts.find(c => c.currency === 'UYU') ?? coinCosts[0];
    const price    = cost ? `$${p.coins * cost.coinValue}` : null;
    const minutes  = Math.round(p.durationSeconds / 60);
    const duration = `${minutes} min`;
    const label    = p.nameKey ? t(`programs.${p.nameKey}`, { defaultValue: p.name }) : p.name;
    return { value: String(p.id), label, duration, price };
  });

  const selectedProgramId = selectedProgram ? String(selectedProgram.id) : null;

  const selectProgramById = (id: string) => {
    const program = programs.find(p => String(p.id) === id);
    if (program) setSelectedProgram(program);
  };

  return {
    machine,
    laundry,
    strategies,
    selectedStrategy,
    setSelectedStrategy,
    selectedProgram,
    programOptions,
    selectedProgramId,
    selectProgramById,
    coinCosts,
    programsLoading,
    paymentState,
    result,
    execute,
    reset,
    isLoading,
    isSuccess,
    isError,
    availabilityStatus,
    machineLabel,
    strings,
  };
}
