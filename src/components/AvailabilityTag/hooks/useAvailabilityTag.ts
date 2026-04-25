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

interface UseAvailabilityTagProps {
  status: MachineStatus;
}

export const useAvailabilityTag = ({ status }: UseAvailabilityTagProps) => {
  const { t } = useTranslation('common');

  const label = t(`machines.status.${status}`);
  const color = fontColorMap[status];
  const surfaceColor = backgroundColorMap[status];

  return { label, color, surfaceColor };
};
