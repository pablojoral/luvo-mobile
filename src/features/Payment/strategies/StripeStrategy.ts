/**
 * StripeStrategy — pay with card via Stripe (stub)
 *
 * To fully implement:
 *   1. npm install @stripe/stripe-react-native
 *   2. Add <StripeProvider publishableKey="…"> in App.tsx
 *   3. Replace the throw below with:
 *        const payment = await paymentService.initiate(machineId, 'stripe', { amount, currency });
 *        const { clientSecret } = payment.clientData as { clientSecret: string };
 *        const { error } = await confirmPayment(clientSecret, { paymentMethodType: 'Card' });
 *        return error ? { success: false, error: error.message } : { success: true, paymentId: payment.paymentId };
 */

import { PaymentContext, PaymentResult, PaymentStrategy } from './PaymentStrategy';

export const stripeStrategy: PaymentStrategy = {
  id:          'stripe',
  label:       'Tarjeta de crédito',
  description: 'Paga con Visa, Mastercard u otras tarjetas.',
  icon:        'CreditCard',
  isAvailable: false, // flip to true once Stripe SDK is integrated

  async execute(_ctx: PaymentContext): Promise<PaymentResult> {
    return { success: false, error: 'stripe_not_configured' };
  },
};
