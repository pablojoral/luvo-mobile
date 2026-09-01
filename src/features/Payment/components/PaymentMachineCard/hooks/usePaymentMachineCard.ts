import type { SvgIconProps } from '@luvo/ui';
import type { Machine } from 'models/models';

interface UsePaymentMachineCardParams {
  machine: Machine;
}

export function usePaymentMachineCard({ machine }: UsePaymentMachineCardParams) {
  const iconName: SvgIconProps['name'] = machine.type === 'dryer' ? 'Wind' : 'Droplet';

  return { iconName };
}
