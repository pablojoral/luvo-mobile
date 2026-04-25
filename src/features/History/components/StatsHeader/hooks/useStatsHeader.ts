import { useTranslation } from 'react-i18next';
import { useHistoryStats } from 'query/History/useHistoryStats';
import { formatAmount } from 'utils/History/formatHistoryItem';

export const useStatsHeader = () => {
  const { t } = useTranslation('common');
  const { data: stats } = useHistoryStats();

  const spentThisMonthLabel = t('history.stats.spentThisMonth');
  const cyclesCompletedLabel = t('history.stats.cyclesCompleted', { count: stats?.cyclesThisMonth ?? 0 });
  const formattedAmount = formatAmount(stats?.totalSpentThisMonth ?? null, stats?.currency ?? null);

  return { spentThisMonthLabel, cyclesCompletedLabel, formattedAmount };
};
