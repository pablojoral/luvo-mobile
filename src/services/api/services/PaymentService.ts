import { Payment } from 'models/models';
import { BaseService } from '../BaseService';

class PaymentService extends BaseService {
  async initiate(
    machineId: number,
    provider = 'mqtt_relay',
    options?: Record<string, unknown>,
  ): Promise<Payment> {
    const res = await this.apiClient.post<Payment>('/payments', {
      machineId,
      provider,
      ...(options ? { options } : {}),
    });
    return res.data;
  }

  async getStatus(paymentId: string): Promise<Payment> {
    const res = await this.apiClient.get<Payment>(`/payments/${paymentId}`);
    return res.data;
  }
}

export const paymentService = new PaymentService();
