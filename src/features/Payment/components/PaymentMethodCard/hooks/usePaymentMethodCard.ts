import { PaymentStrategy } from '../../../strategies/PaymentStrategy';
import { usePaymentMethodCardStrings } from './usePaymentMethodCardStrings';

interface UsePaymentMethodCardParams {
  strategy: PaymentStrategy;
}

export function usePaymentMethodCard({ strategy }: UsePaymentMethodCardParams) {
  const strings = usePaymentMethodCardStrings();

  // Resolve label: fall back to strategy.label for unknown strategy IDs.
  let label: string;
  let localizedDescription: string;

  if (strategy.id === 'mercadopago') {
    label = strings.mercadopagoLabel;
    localizedDescription = strings.mercadopagoDescription;
  } else if (strategy.id === 'mqtt_relay') {
    label = strings.mqttRelayLabel;
    localizedDescription = strings.mqttRelayDescription;
  } else if (strategy.id === 'stripe') {
    label = strings.stripeLabel;
    localizedDescription = strings.stripeDescription;
  } else {
    label = strategy.label;
    localizedDescription = strategy.description;
  }

  const description = strategy.isAvailable ? localizedDescription : strings.comingSoon;

  return {
    label,
    description,
  };
}
