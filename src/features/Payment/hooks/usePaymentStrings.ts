import { useTranslation } from 'react-i18next';
import type { PaymentErrorCode, PaymentProgressCode } from '../strategies/paymentCodes';

export const usePaymentStrings = (
  progressCode?: PaymentProgressCode | null,
  error?: PaymentErrorCode | null,
) => {
  const { t } = useTranslation('common');

  const errorGeneric = t('payment.error.generic');

  return {
    title:           t('payment.title'),
    methodPicker:    t('payment.methodPicker'),
    confirm:         t('payment.confirm'),
    processing:      t('payment.processing'),
    successTitle:    t('payment.success.title'),
    successSubtitle: t('payment.success.subtitle'),
    done:            t('payment.success.done'),
    errorTitle:      t('payment.error.title'),
    errorGeneric,
    retry:           t('payment.error.retry'),
    cancel:          t('payment.error.cancel'),
    progressMsg:     progressCode
      ? t(`payment.progress.${progressCode}` as `payment.progress.${PaymentProgressCode}`)
      : '',
    errorMsg:        error
      ? t(`payment.errors.${error}` as `payment.errors.${PaymentErrorCode}`)
      : errorGeneric,
    availabilityLabels: {
      available:      t('machines.status.available'),
      'in-use':       t('machines.status.in_use'),
      'out-of-order': t('machines.status.out_of_order'),
      maintenance:    t('machines.status.maintenance'),
    },
  };
};
