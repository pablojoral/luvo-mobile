/**
 * MercadoPagoStrategy — Checkout Pro via InAppBrowser
 *
 * Flow:
 *   POST /payments { machineId, provider: 'mercadopago' }
 *   → opens MP hosted checkout in SFSafariViewController / Chrome Custom Tab
 *   → MP redirects to luvo://payment?result=success&external_reference=<paymentId>
 *   → poll GET /payments/:id until status ≠ 'pending' (IPN has already fired on backend)
 */

import InAppBrowser from 'react-native-inappbrowser-reborn';
import { Linking } from 'react-native';
import { paymentService } from 'services/api/services/PaymentService';
import { PaymentContext, PaymentResult, PaymentStrategy } from './PaymentStrategy';

const POLL_INTERVAL_MS = 2_000;
const POLL_TIMEOUT_MS  = 60_000; // longer than mqtt_relay — IPN adds round-trip latency
const DEEP_LINK_TIMEOUT_MS = 5 * 60 * 1000; // 5 min — user may take time on checkout page

function waitForDeepLink(paymentId: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      subscription.remove();
      reject(new Error('Tiempo de espera agotado esperando respuesta de MercadoPago.'));
    }, DEEP_LINK_TIMEOUT_MS);

    const subscription = Linking.addEventListener('url', ({ url }) => {
      try {
        const parsed = new URL(url);
        if (
          parsed.protocol === 'luvo:' &&
          parsed.hostname === 'payment' &&
          parsed.searchParams.get('external_reference') === paymentId
        ) {
          clearTimeout(timeout);
          subscription.remove();
          resolve(parsed.searchParams.get('result') ?? 'unknown');
        }
      } catch {
        // ignore malformed URLs
      }
    });
  });
}

async function pollUntilSettled(paymentId: string): Promise<PaymentResult> {
  const deadline = Date.now() + POLL_TIMEOUT_MS;

  while (Date.now() < deadline) {
    await new Promise<void>(resolve => setTimeout(() => resolve(), POLL_INTERVAL_MS));
    const payment = await paymentService.getStatus(paymentId);
    if (payment.status === 'executed') {
      return { success: true, paymentId: payment.paymentId };
    }
    if (payment.status === 'failed' || payment.status === 'cancelled') {
      return { success: false, paymentId: payment.paymentId, error: 'El pago fue rechazado.' };
    }
  }

  return { success: false, error: 'Tiempo de espera agotado. Verifica el estado de la máquina.' };
}

export const mercadoPagoStrategy: PaymentStrategy = {
  id:          'mercadopago',
  label:       'MercadoPago',
  description: 'Pagá con tarjeta, Mercado Crédito o efectivo.',
  icon:        'CreditCard',
  isAvailable: true,

  async execute({ machineId, onProgress }: PaymentContext): Promise<PaymentResult> {
    onProgress?.('Creando preferencia de pago…');

    const payment = await paymentService.initiate(machineId, 'mercadopago');
    const { initPoint } = payment.clientData as { initPoint: string };

    const available = await InAppBrowser.isAvailable();
    if (!available) {
      return { success: false, error: 'No se puede abrir el navegador en este dispositivo.' };
    }

    onProgress?.('Abriendo MercadoPago…');

    // Register listener BEFORE opening browser to avoid race condition
    const deepLinkPromise = waitForDeepLink(payment.paymentId);

    await InAppBrowser.open(initPoint, {
      // iOS
      dismissButtonStyle:        'cancel',
      preferredBarTintColor:     '#6B46C1',
      preferredControlTintColor: '#FFFFFF',
      animated:                  true,
      enableBarCollapsing:       false,
      // Android
      showTitle:                  true,
      toolbarColor:               '#6B46C1',
      enableUrlBarHiding:         true,
      enableDefaultShare:         false,
      forceCloseOnRedirection:    true,
    });

    let result: string;
    try {
      result = await deepLinkPromise;
    } catch (e: unknown) {
      return { success: false, error: e instanceof Error ? e.message : 'Error desconocido' };
    }

    if (result === 'failure' || result === 'cancelled' || result === 'unknown') {
      return { success: false, error: 'El pago fue cancelado o rechazado.' };
    }

    // result === 'success' or 'pending' — wait for backend IPN to confirm
    onProgress?.('Verificando pago…');
    return pollUntilSettled(payment.paymentId);
  },
};
