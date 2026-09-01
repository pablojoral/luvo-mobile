import type { FontColor, SvgIconProps } from '@luvo/ui';

export type PaymentResultVariant = 'success' | 'error';

interface UsePaymentResultStateParams {
  variant: PaymentResultVariant;
}

export function usePaymentResultState({ variant }: UsePaymentResultStateParams) {
  const iconName: SvgIconProps['name'] = variant === 'success' ? 'Star' : 'AlertCircle';
  const iconColor: FontColor = variant === 'success' ? 'font-success' : 'font-error';

  return { iconName, iconColor };
}
