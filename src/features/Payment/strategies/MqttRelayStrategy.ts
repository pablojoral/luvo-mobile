/**
 * MqttRelayStrategy — free direct relay payment
 *
 * Flow:
 *   POST /payments { machineId, provider: 'mqtt_relay' }
 *   → poll GET /payments/:id until status ≠ 'pending' (or timeout)
 */

import { paymentService } from 'services/api/services/PaymentService';
import { PaymentContext, PaymentResult, PaymentStrategy } from './PaymentStrategy';

const POLL_INTERVAL_MS = 2_000;
const POLL_TIMEOUT_MS  = 30_000;

async function pollUntilSettled(paymentId: string): Promise<PaymentResult> {
  const deadline = Date.now() + POLL_TIMEOUT_MS;

  while (Date.now() < deadline) {
    await new Promise<void>(resolve => setTimeout(() => resolve(), POLL_INTERVAL_MS));
    const payment = await paymentService.getStatus(paymentId);
    if (payment.status === 'executed') {
      return { success: true, paymentId: payment.paymentId };
    }
    if (payment.status === 'failed' || payment.status === 'relay_busy') {
      return {
        success:   false,
        paymentId: payment.paymentId,
        error:     payment.status === 'relay_busy' ? 'relay_busy' : 'payment_failed',
      };
    }
    // status === 'pending' → keep polling
  }

  return { success: false, error: 'timeout' };
}

export const mqttRelayStrategy: PaymentStrategy = {
  id:          'mqtt_relay',
  label:       'Pago Directo',
  description: 'La máquina se activa inmediatamente sin cargo adicional.',
  icon:        'CreditCard',
  isAvailable: true,

  async execute({ machineId, onProgress }: PaymentContext): Promise<PaymentResult> {
    onProgress?.('sending_command');
    const payment = await paymentService.initiate(machineId, 'mqtt_relay');

    onProgress?.('awaiting_controller');
    return pollUntilSettled(payment.paymentId);
  },
};
