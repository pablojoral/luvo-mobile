import { Tag } from 'components/Tag/Tag';
import { MachineStatus } from 'models/models';
import { FontColor, SurfaceColor } from 'theme/types/Theme';

const labelMap: Record<MachineStatus, string> = {
  available: 'Disponible',
  in_use: 'En uso',
  out_of_order: 'Fuera de servicio',
  maintenance: 'Mantenimiento',
};

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

interface AvailabilityTagProps {
  status: MachineStatus;
}

export const AvailabilityTag = ({ status }: AvailabilityTagProps) => {
  const label = labelMap[status];

  return (
    <Tag color={fontColorMap[status]} surfaceColor={backgroundColorMap[status]}>
      {label}
    </Tag>
  );
};
