import { useTranslation } from 'react-i18next';

import { PaymentStrategy } from '../../../strategies/PaymentStrategy';

interface UsePaymentMethodCardParams {
  strategy: PaymentStrategy;
}

export function usePaymentMethodCard({ strategy }: UsePaymentMethodCardParams) {
  const { t } = useTranslation('common');

  // Resolve label: fall back to strategy.label for unknown strategy IDs.
  let label: string;
  let localizedDescription: string;

  if (strategy.id === 'mercadopago') {
    label = t('payment.strategies.mercadopago.label');
    localizedDescription = t('payment.strategies.mercadopago.description');
  } else if (strategy.id === 'mqtt_relay') {
    label = t('payment.strategies.mqtt_relay.label');
    localizedDescription = t('payment.strategies.mqtt_relay.description');
  } else if (strategy.id === 'stripe') {
    label = t('payment.strategies.stripe.label');
    localizedDescription = t('payment.strategies.stripe.description');
  } else {
    label = strategy.label;
    localizedDescription = strategy.description;
  }

  const description = strategy.isAvailable ? localizedDescription : t('payment.comingSoon');

  return {
    label,
    description,
  };
}
