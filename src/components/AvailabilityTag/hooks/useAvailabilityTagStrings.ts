import { useTranslation } from 'react-i18next';
import { MachineStatus } from 'models/models';

const STATUS_LABEL_KEYS = {
  available: 'machines.status.available',
  in_use: 'machines.status.in_use',
  out_of_order: 'machines.status.out_of_order',
  maintenance: 'machines.status.maintenance',
} as const satisfies Record<MachineStatus, string>;

export const useAvailabilityTagStrings = (status: MachineStatus) => {
  const { t } = useTranslation('common');

  return {
    label: t(STATUS_LABEL_KEYS[status]),
  };
};
