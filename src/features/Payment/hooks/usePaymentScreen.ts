import { useTranslation } from 'react-i18next';

import { useLaundriesStore } from 'stores/useLaundriesStore';
import type { PaymentErrorCode, PaymentProgressCode } from '../strategies/paymentCodes';
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

  const { strategies, selectedStrategy, setSelectedStrategy, paymentState, progressCode, result, execute, reset } =
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

  // Translate at the React boundary — strategies emit codes, hooks resolve them.
  // Map values are valid i18n keys but typed as `string`; template-literal form
  // matches the existing codebase pattern (see useAvailabilityTag) and avoids
  // fighting react-i18next's strict key union.
  const progressMsg = progressCode
    ? t(`payment.progress.${progressCode}` as `payment.progress.${PaymentProgressCode}`)
    : '';
  const errorMsg = result?.error
    ? t(`payment.errors.${result.error}` as `payment.errors.${PaymentErrorCode}`)
    : strings.errorGeneric;

  return {
    machine,
    laundry,
    strategies,
    selectedStrategy,
    setSelectedStrategy,
    paymentState,
    progressMsg,
    errorMsg,
    result,
    execute,
    reset,
    isLoading,
    isSuccess,
    isError,
    strings,
  };
}
