import type { MachineStatus } from 'models/models';
import type { AvailabilityStatus } from '@luvo/ui';

/**
 * Maps the luvo-mobile MachineStatus (underscore separators) to the
 * @luvo/ui AvailabilityStatus (hyphen separators).
 */
export const toAvailabilityStatus = (status: MachineStatus): AvailabilityStatus => {
  const map: Record<MachineStatus, AvailabilityStatus> = {
    available:    'available',
    in_use:       'in-use',
    out_of_order: 'out-of-order',
    maintenance:  'maintenance',
  };
  return map[status];
};
