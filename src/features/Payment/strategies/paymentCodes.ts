/**
 * Machine-readable codes emitted by payment strategies.
 *
 * Non-React modules (strategies, services) emit these codes; translation happens
 * exclusively at the React boundary (usePaymentScreen). See ADR-003.
 */

export const PAYMENT_PROGRESS_CODES = {
  sending_command:     'sending_command',
  awaiting_controller: 'awaiting_controller',
  creating_preference: 'creating_preference',
  opening_checkout:    'opening_checkout',
  verifying_payment:   'verifying_payment',
} as const satisfies Record<string, string>;

export type PaymentProgressCode = keyof typeof PAYMENT_PROGRESS_CODES;

export const PAYMENT_ERROR_CODES = {
  relay_busy:             'relay_busy',
  payment_failed:         'payment_failed',
  timeout:                'timeout',
  rejected:               'rejected',
  cancelled_or_rejected:  'cancelled_or_rejected',
  browser_unavailable:    'browser_unavailable',
  mp_deeplink_timeout:    'mp_deeplink_timeout',
  stripe_not_configured:  'stripe_not_configured',
  unknown:                'unknown',
} as const satisfies Record<string, string>;

export type PaymentErrorCode = keyof typeof PAYMENT_ERROR_CODES;

/**
 * Maps each progress code to its i18n key.
 * Adding a new PaymentProgressCode without a matching entry here fails the build.
 */
export const PAYMENT_PROGRESS_KEYS: Record<PaymentProgressCode, string> = {
  sending_command:     'payment.progress.sending_command',
  awaiting_controller: 'payment.progress.awaiting_controller',
  creating_preference: 'payment.progress.creating_preference',
  opening_checkout:    'payment.progress.opening_checkout',
  verifying_payment:   'payment.progress.verifying_payment',
};

/**
 * Maps each error code to its i18n key.
 * Adding a new PaymentErrorCode without a matching entry here fails the build.
 */
export const PAYMENT_ERROR_KEYS: Record<PaymentErrorCode, string> = {
  relay_busy:            'payment.errors.relay_busy',
  payment_failed:        'payment.errors.payment_failed',
  timeout:               'payment.errors.timeout',
  rejected:              'payment.errors.rejected',
  cancelled_or_rejected: 'payment.errors.cancelled_or_rejected',
  browser_unavailable:   'payment.errors.browser_unavailable',
  mp_deeplink_timeout:   'payment.errors.mp_deeplink_timeout',
  stripe_not_configured: 'payment.errors.stripe_not_configured',
  unknown:               'payment.errors.unknown',
};
