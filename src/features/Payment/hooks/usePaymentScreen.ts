import { useTranslation } from 'react-i18next';

import { useLaundriesStore } from 'stores/useLaundriesStore';
import { usePayment } from './usePayment';

interface UsePaymentScreenParams {
  machineId: number;
}

export function usePaymentScreen({ machineId }: UsePaymentScreenParams) {
  const { t } = useTranslation('common');

  const machine = useLaundriesStore(
    s => s.laundries.flatMap(l => l.machines ?? []).find(m => m.id === machineId) ?? null,
  );
  const laundry = useLaundriesStore(
    s => s.laundries.find(l => l.machines?.some(m => m.id === machineId)) ?? null,
  );

  const { strategies, selectedStrategy, setSelectedStrategy, paymentState, progressMsg, result, execute, reset } =
    usePayment(machineId);

  const isLoading = paymentState === 'loading';
  const isSuccess = paymentState === 'success';
  const isError = paymentState === 'error';

  const strings = {
    title: t('payment.title'),
    methodPicker: t('payment.methodPicker'),
    confirm: t('payment.confirm'),
    processing: t('payment.processing'),
    successTitle: t('payment.success.title'),
    successSubtitle: t('payment.success.subtitle'),
    done: t('payment.success.done'),
    errorTitle: t('payment.error.title'),
    errorGeneric: t('payment.error.generic'),
    retry: t('payment.error.retry'),
    cancel: t('payment.error.cancel'),
  };

  return {
    machine,
    laundry,
    strategies,
    selectedStrategy,
    setSelectedStrategy,
    paymentState,
    progressMsg,
    result,
    execute,
    reset,
    isLoading,
    isSuccess,
    isError,
    strings,
  };
}
