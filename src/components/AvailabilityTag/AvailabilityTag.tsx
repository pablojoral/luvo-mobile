import { Tag } from 'components/Tag/Tag';
import { MachineStatus } from 'models/models';
import { useAvailabilityTag } from './hooks/useAvailabilityTag';

interface AvailabilityTagProps {
  status: MachineStatus;
}

export const AvailabilityTag = ({ status }: AvailabilityTagProps) => {
  const { label, color, surfaceColor } = useAvailabilityTag({ status });

  return (
    <Tag color={color} surfaceColor={surfaceColor}>
      {label}
    </Tag>
  );
};
