import { IconName } from 'components/SvgIcon/types';
import type { PaymentErrorCode, PaymentProgressCode } from './paymentCodes';

export interface PaymentContext {
  machineId: number;
  onProgress?: (code: PaymentProgressCode) => void;
}

export interface PaymentResult {
  success:   boolean;
  paymentId?: string;
  /** Machine-readable error code when success is false — translated at the React boundary */
  error?:    PaymentErrorCode;
  /** Provider-specific data forwarded to the screen (e.g. Stripe client_secret) */
  clientData?: Record<string, unknown>;
}

export interface PaymentStrategy {
  /** Unique provider ID — must match the server's registry key */
  readonly id: string;
  /** Display name shown in the method picker */
  readonly label: string;
  /** Short description shown below the label */
  readonly description: string;
  /** SvgIcon name for the method card icon */
  readonly icon: IconName;
  /** Whether this strategy is ready to use (false = shown as "coming soon") */
  readonly isAvailable: boolean;

  execute(ctx: PaymentContext): Promise<PaymentResult>;
}
