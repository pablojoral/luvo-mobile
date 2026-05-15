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

  const { strategies, selectedStrategy, setSelectedStrategy, paymentState, progressCode, result, execute, reset } =
    usePayment(machineId);

  const isLoading = paymentState === 'loading';
  const isSuccess = paymentState === 'success';
  const isError = paymentState === 'error';

  const strings = usePaymentStrings(progressCode, result?.error);

  const availabilityStatus = machine ? toAvailabilityStatus(machine.status) : 'available';

  return {
    machine,
    laundry,
    strategies,
    selectedStrategy,
    setSelectedStrategy,
    paymentState,
    result,
    execute,
    reset,
    isLoading,
    isSuccess,
    isError,
    availabilityStatus,
    strings,
  };
}
