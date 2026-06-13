import { useQuery } from '@tanstack/react-query';
import { paymentService } from 'services/api/services/PaymentService';
import { qk } from '../keys';

export function useCoinCosts() {
  return useQuery({
    queryKey: qk.coinCosts.list(),
    queryFn:  () => paymentService.getCoinCosts(),
  });
}
