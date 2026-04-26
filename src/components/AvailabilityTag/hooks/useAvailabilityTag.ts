import { MachineStatus } from 'models/models';
import { useTranslation } from 'react-i18next';
import type { FontColor, SurfaceColor } from 'theme/types/Theme';

const fontColorMap: Record<MachineStatus, FontColor> = {
  available: 'font-success',
  in_use: 'font-error',
  out_of_order: 'font-disabled',
  maintenance: 'font-warning',
};

const backgroundColorMap: Record<MachineStatus, SurfaceColor> = {
  available: 'surface-success',
  in_use: 'surface-error',
  out_of_order: 'surface-disabled',
  maintenance: 'surface-warning',
};

const STATUS_LABEL_KEYS = {
  available: 'machines.status.available',
  in_use: 'machines.status.in_use',
  out_of_order: 'machines.status.out_of_order',
  maintenance: 'machines.status.maintenance',
} as const satisfies Record<MachineStatus, string>;

interface UseAvailabilityTagProps {
  status: MachineStatus;
}

export const useAvailabilityTag = ({ status }: UseAvailabilityTagProps) => {
  const { t } = useTranslation('common');

  const label = t(STATUS_LABEL_KEYS[status]);
  const color = fontColorMap[status];
  const surfaceColor = backgroundColorMap[status];

  return { label, color, surfaceColor };
};
