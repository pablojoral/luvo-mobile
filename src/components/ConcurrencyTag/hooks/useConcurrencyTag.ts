import { useTranslation } from 'react-i18next';
import type { FontColor } from 'theme/types/Theme';

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
  const { t } = useTranslation('common');
  const level = getLevel(available, total);

  return {
    label: t(`laundry.concurrency.${level}`),
    color: fontColorMap[level],
  };
};
