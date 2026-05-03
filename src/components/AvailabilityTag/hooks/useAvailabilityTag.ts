import { MachineStatus } from 'models/models';
import type { FontColor, SurfaceColor } from 'theme/types/Theme';
import { useAvailabilityTagStrings } from './useAvailabilityTagStrings';

const fontColorMap: Record<MachineStatus, FontColor> = {
  available: 'font-status-available',
  in_use: 'font-status-in-use',
  out_of_order: 'font-status-out-of-order',
  maintenance: 'font-status-maintenance',
};

const backgroundColorMap: Record<MachineStatus, SurfaceColor> = {
  available: 'surface-status-available',
  in_use: 'surface-status-in-use',
  out_of_order: 'surface-status-out-of-order',
  maintenance: 'surface-status-maintenance',
};

interface UseAvailabilityTagProps {
  status: MachineStatus;
}

export const useAvailabilityTag = ({ status }: UseAvailabilityTagProps) => {
  const { label } = useAvailabilityTagStrings(status);
  const color = fontColorMap[status];
  const surfaceColor = backgroundColorMap[status];

  return { label, color, surfaceColor };
};
