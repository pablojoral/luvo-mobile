import { CoinCost, Payment, Program } from 'models/models';
import { BaseService } from '../BaseService';

class PaymentService extends BaseService {
  async initiate(
    machineId: number,
    provider = 'mqtt_relay',
    programId?: number | null,
    options?: Record<string, unknown>,
  ): Promise<Payment> {
    const res = await this.apiClient.post<Payment>('/payments', {
      machineId,
      provider,
      ...(programId != null ? { programId } : {}),
      ...(options ? { options } : {}),
    });
    return res.data;
  }

  async getStatus(paymentId: string): Promise<Payment> {
    const res = await this.apiClient.get<Payment>(`/payments/${paymentId}`);
    return res.data;
  }

  async getPrograms(): Promise<Program[]> {
    const res = await this.apiClient.get<Program[]>('/programs');
    return res.data;
  }

  async getCoinCosts(): Promise<CoinCost[]> {
    const res = await this.apiClient.get<CoinCost[]>('/coin-costs');
    return res.data;
  }
}

export const paymentService = new PaymentService();
