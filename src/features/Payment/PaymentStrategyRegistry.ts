/**
 * PaymentStrategyRegistry — ordered list of payment strategies.
 *
 * To add a new method:
 *   1. Implement PaymentStrategy in strategies/
 *   2. Push it into the array below
 *   3. It will automatically appear in the payment method picker
 */

import { PaymentStrategy }        from './strategies/PaymentStrategy';
import { mqttRelayStrategy }      from './strategies/MqttRelayStrategy';
import { mercadoPagoStrategy }    from './strategies/MercadoPagoStrategy';
import { stripeStrategy }         from './strategies/StripeStrategy';

const registry: PaymentStrategy[] = [
  mercadoPagoStrategy,
  mqttRelayStrategy,
  stripeStrategy,
];

export function getAllStrategies(): PaymentStrategy[] {
  return registry;
}

export function getStrategy(id: string): PaymentStrategy | undefined {
  return registry.find(s => s.id === id);
}
