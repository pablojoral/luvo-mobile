import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistoryStats } from 'query/History/useHistoryStats';
import { formatAmount } from 'utils/History/formatHistoryItem';

export const useStatsHeader = () => {
  const { t, i18n } = useTranslation('common');
  const { data: stats } = useHistoryStats();

  const spentThisMonthLabel = t('history.stats.spentThisMonth');

  const { formattedAmount, cyclesCompletedLabel } = useMemo(() => ({
    formattedAmount: formatAmount(stats?.totalSpentThisMonth ?? 0, stats?.currency ?? null, i18n.language),
    cyclesCompletedLabel: t('history.stats.cyclesCompleted', { count: stats?.cyclesThisMonth ?? 0 }),
  }), [stats, i18n.language, t]);

  return { spentThisMonthLabel, cyclesCompletedLabel, formattedAmount };
};
