import { Tag } from 'components/Tag/Tag';
import { useTimeTag } from './hooks/useTimeTag';

interface TimeTagProps {
  seconds: number;
  extended?: boolean;
}

export const TimeTag = ({ seconds, extended = false }: TimeTagProps) => {
  const { displayTime } = useTimeTag(seconds, extended);

  return (
    <Tag
      color="font-primary"
      surfaceColor="surface-primary"
      fontWeight="semibold"
      iconName="Clock"
      iconSize="icon-size-xs"
    >
      {displayTime}
    </Tag>
  );
};
