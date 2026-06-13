import { useTranslation } from 'react-i18next';

export const usePaymentMethodCardStrings = () => {
  const { t } = useTranslation('common');

  return {
    mercadopagoLabel: t('payment.strategies.mercadopago.label'),
    mercadopagoDescription: t('payment.strategies.mercadopago.description'),
    mqttRelayLabel: t('payment.strategies.mqtt_relay.label'),
    mqttRelayDescription: t('payment.strategies.mqtt_relay.description'),
    comingSoon: t('payment.comingSoon'),
  };
};
