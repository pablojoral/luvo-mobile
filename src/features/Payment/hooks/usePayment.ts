import { useState } from 'react';

import { Program } from 'models/models';
import { usePrograms } from 'query/Programs/usePrograms';
import { useCoinCosts } from 'query/CoinCosts/useCoinCosts';
import { logger } from 'services/logger';
import { getAllStrategies } from '../PaymentStrategyRegistry';
import { PaymentResult, PaymentStrategy } from '../strategies/PaymentStrategy';
import type { PaymentProgressCode } from '../strategies/paymentCodes';

export type PaymentState = 'idle' | 'loading' | 'success' | 'error';

export function usePayment(machineId: number) {
  const strategies = getAllStrategies();

  const [selectedStrategy, setSelectedStrategy] = useState<PaymentStrategy>(
    () => strategies.find(s => s.isAvailable) ?? strategies[0]!,
  );
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [paymentState,    setPaymentState]    = useState<PaymentState>('idle');
  const [progressCode,    setProgressCode]    = useState<PaymentProgressCode | null>(null);
  const [result,          setResult]          = useState<PaymentResult | null>(null);

  const { data: programs = [],  isLoading: programsLoading }  = usePrograms();
  const { data: coinCosts = [], isLoading: coinCostsLoading } = useCoinCosts();

  const execute = async () => {
    if (!selectedStrategy.isAvailable || !selectedProgram) return;

    setPaymentState('loading');
    setProgressCode(null);
    setResult(null);

    try {
      const res = await selectedStrategy.execute({
        machineId,
        programId:  selectedProgram.id,
        onProgress: code => setProgressCode(code),
      });
      setResult(res);
      setPaymentState(res.success ? 'success' : res.error === 'cancelled_by_user' ? 'idle' : 'error');
    } catch (e) {
      logger.error('Payment', 'unexpected error during strategy execution', e);
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
    selectedProgram,
    setSelectedProgram,
    programs,
    coinCosts,
    programsLoading,
    coinCostsLoading,
    paymentState,
    progressCode,
    result,
    execute,
    reset,
  };
}
