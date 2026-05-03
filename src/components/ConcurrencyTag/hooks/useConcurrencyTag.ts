import type { FontColor } from 'theme/types/Theme';
import { useConcurrencyTagStrings } from './useConcurrencyTagStrings';

type ConcurrencyLevel = 'low' | 'medium' | 'high' | 'none';

const fontColorMap: Record<ConcurrencyLevel, FontColor> = {
  low:    'font-success',
  medium: 'font-warning',
  high:   'font-error',
  none:   'font-disabled',
};

function getLevel(available: number, total: number): ConcurrencyLevel {
  if (total === 0 || available === 0) return 'none';
  const ratio = available / total;
  if (ratio >= 0.66) return 'low';
  if (ratio >= 0.33) return 'medium';
  return 'high';
}

interface UseConcurrencyTagParams {
  available: number;
  total: number;
}

export const useConcurrencyTag = ({ available, total }: UseConcurrencyTagParams) => {
  const level = getLevel(available, total);
  const { label } = useConcurrencyTagStrings(level);

  return {
    label,
    color: fontColorMap[level],
  };
};
