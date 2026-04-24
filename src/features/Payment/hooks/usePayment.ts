import { useState } from 'react';

import { getAllStrategies } from '../PaymentStrategyRegistry';
import { PaymentResult, PaymentStrategy } from '../strategies/PaymentStrategy';

export type PaymentState = 'idle' | 'loading' | 'success' | 'error';

export function usePayment(machineId: number) {
  const strategies = getAllStrategies();

  const [selectedStrategy, setSelectedStrategy] = useState<PaymentStrategy>(
    () => strategies.find(s => s.isAvailable) ?? strategies[0]!,
  );
  const [paymentState,  setPaymentState]  = useState<PaymentState>('idle');
  const [progressMsg,   setProgressMsg]   = useState<string>('');
  const [result,        setResult]        = useState<PaymentResult | null>(null);

  const execute = async () => {
    if (!selectedStrategy.isAvailable) return;

    setPaymentState('loading');
    setProgressMsg('');
    setResult(null);

    try {
      const res = await selectedStrategy.execute({
        machineId,
        onProgress: msg => setProgressMsg(msg),
      });
      setResult(res);
      setPaymentState(res.success ? 'success' : 'error');
    } catch (err: unknown) {
      setResult({ success: false, error: err instanceof Error ? err.message : 'Error desconocido' });
      setPaymentState('error');
    }
  };

  const reset = () => {
    setPaymentState('idle');
    setProgressMsg('');
    setResult(null);
  };

  return {
    strategies,
    selectedStrategy,
    setSelectedStrategy,
    paymentState,
    progressMsg,
    result,
    execute,
    reset,
  };
}
