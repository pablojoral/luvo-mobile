import { useQuery } from '@tanstack/react-query';
import { paymentService } from 'services/api/services/PaymentService';
import { qk } from '../keys';

export function usePrograms() {
  return useQuery({
    queryKey: qk.programs.list(),
    queryFn:  () => paymentService.getPrograms(),
  });
}
