/**
 * MercadoPagoStrategy — Checkout Pro via InAppBrowser
 *
 * Flow:
 *   POST /payments { machineId, provider: 'mercadopago' }
 *   → opens MP hosted checkout via openAuth (ASWebAuthenticationSession / Chrome Custom Tab)
 *   → MP redirects to luvo://payment?result=success&external_reference=<paymentId>
 *   → openAuth returns the redirect URL directly — no Linking.addEventListener needed
 *   → poll GET /payments/:id until status ≠ 'pending' (IPN has already fired on backend)
 */

import InAppBrowser from 'react-native-inappbrowser-reborn';
import { paymentService } from 'services/api/services/PaymentService';
import { logger } from 'services/logger';
import { PaymentContext, PaymentResult, PaymentStrategy } from './PaymentStrategy';

const TAG = 'MercadoPago';

const POLL_INTERVAL_MS = 2_000;
const POLL_TIMEOUT_MS  = 60_000;

async function pollUntilSettled(paymentId: string): Promise<PaymentResult> {
  const deadline = Date.now() + POLL_TIMEOUT_MS;

  while (Date.now() < deadline) {
    await new Promise<void>(resolve => setTimeout(() => resolve(), POLL_INTERVAL_MS));
    const payment = await paymentService.getStatus(paymentId);
    logger.debug(TAG, 'poll status', { paymentId, status: payment.status });
    if (payment.status === 'executed') {
      logger.info(TAG, 'payment executed', { paymentId });
      return { success: true, paymentId: payment.paymentId };
    }
    if (payment.status === 'failed' || payment.status === 'cancelled') {
      logger.warn(TAG, 'payment rejected', { paymentId, status: payment.status });
      return { success: false, paymentId: payment.paymentId, error: 'rejected' };
    }
  }

  logger.warn(TAG, 'poll timed out', { paymentId });
  return { success: false, error: 'timeout' };
}

export const mercadoPagoStrategy: PaymentStrategy = {
  id:          'mercadopago',
  label:       'MercadoPago',
  description: 'Pagá con tarjeta, Mercado Crédito o efectivo.',
  icon:        'CreditCard',
  isAvailable: true,

  async execute({ machineId, programId, onProgress }: PaymentContext): Promise<PaymentResult> {
    logger.info(TAG, 'initiating payment', { machineId });
    onProgress?.('creating_preference');

    let payment;
    try {
      payment = await paymentService.initiate(machineId, 'mercadopago', programId);
    } catch (e) {
      logger.error(TAG, 'failed to create preference', e);
      return { success: false, error: 'unknown' };
    }
    const { initPoint } = payment.clientData as { initPoint: string };
    logger.debug(TAG, 'preference created', { paymentId: payment.paymentId });

    const available = await InAppBrowser.isAvailable();
    if (!available) {
      logger.error(TAG, 'InAppBrowser unavailable');
      return { success: false, error: 'browser_unavailable' };
    }

    onProgress?.('opening_checkout');
    logger.debug(TAG, 'opening checkout browser', { paymentId: payment.paymentId });

    // openAuth monitors for a redirect to the luvo:// scheme and returns the full URL
    // as the result — no Linking.addEventListener race conditions.
    // On iOS this uses ASWebAuthenticationSession; on Android, Chrome Custom Tab.
    const authResult = await InAppBrowser.openAuth(initPoint, 'luvo://payment', {
      // iOS
      dismissButtonStyle:        'cancel',
      preferredBarTintColor:     '#6B46C1',
      preferredControlTintColor: '#FFFFFF',
      animated:                  true,
      ephemeralWebSession:       false,
      // Android
      showTitle:                  true,
      toolbarColor:               '#6B46C1',
      enableUrlBarHiding:         true,
      enableDefaultShare:         false,
    });

    logger.debug(TAG, 'auth result', { type: authResult.type, paymentId: payment.paymentId });

    if (authResult.type !== 'success') {
      logger.info(TAG, 'browser closed by user without completing payment', { paymentId: payment.paymentId });
      return { success: false, error: 'cancelled_by_user' };
    }

    const qs = authResult.url.includes('?') ? authResult.url.split('?')[1] : '';
    const params = new URLSearchParams(qs);
    const result = params.get('result') ?? 'unknown';

    logger.debug(TAG, 'redirect received', {
      paymentId: payment.paymentId,
      result,
      external_reference: params.get('external_reference'),
    });

    if (result === 'failure' || result === 'cancelled' || result === 'unknown') {
      logger.warn(TAG, 'checkout cancelled or rejected', { paymentId: payment.paymentId, result });
      return { success: false, error: 'cancelled_or_rejected' };
    }

    // result === 'success' or 'pending' — wait for backend IPN to confirm
    onProgress?.('verifying_payment');
    logger.debug(TAG, 'verifying payment via poll', { paymentId: payment.paymentId });
    return pollUntilSettled(payment.paymentId);
  },
};
