import { useState } from 'react';

import { getAllStrategies } from '../PaymentStrategyRegistry';
import { PaymentResult, PaymentStrategy } from '../strategies/PaymentStrategy';
import type { PaymentProgressCode } from '../strategies/paymentCodes';

export type PaymentState = 'idle' | 'loading' | 'success' | 'error';

export function usePayment(machineId: number) {
  const strategies = getAllStrategies();

  const [selectedStrategy, setSelectedStrategy] = useState<PaymentStrategy>(
    () => strategies.find(s => s.isAvailable) ?? strategies[0]!,
  );
  const [paymentState,  setPaymentState]  = useState<PaymentState>('idle');
  const [progressCode,  setProgressCode]  = useState<PaymentProgressCode | null>(null);
  const [result,        setResult]        = useState<PaymentResult | null>(null);

  const execute = async () => {
    if (!selectedStrategy.isAvailable) return;

    setPaymentState('loading');
    setProgressCode(null);
    setResult(null);

    try {
      const res = await selectedStrategy.execute({
        machineId,
        onProgress: code => setProgressCode(code),
      });
      setResult(res);
      setPaymentState(res.success ? 'success' : 'error');
    } catch {
      setResult({ success: false, error: 'unknown' });
      setPaymentState('error');
    }
  };

  const reset = () => {
    setPaymentState('idle');
    setProgressCode(null);
    setResult(null);
  };

  return {
    strategies,
    selectedStrategy,
    setSelectedStrategy,
    paymentState,
    progressCode,
    result,
    execute,
    reset,
  };
}
