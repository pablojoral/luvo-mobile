import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistoryStats } from 'query/History/useHistoryStats';
import { formatAmount } from 'utils/History/formatHistoryItem';
import { useStatsHeaderStrings } from './useStatsHeaderStrings';

export const useStatsHeader = () => {
  const { i18n } = useTranslation('common');
  const { spentThisMonthLabel, cyclesCompleted } = useStatsHeaderStrings();
  const { data: stats } = useHistoryStats();

  const { formattedAmount, cyclesCompletedLabel } = useMemo(() => ({
    formattedAmount: formatAmount(stats?.totalSpentThisMonth ?? 0, stats?.currency ?? null, i18n.language),
    cyclesCompletedLabel: cyclesCompleted(stats?.cyclesThisMonth ?? 0),
  }), [stats, i18n.language, cyclesCompleted]);

  return { spentThisMonthLabel, cyclesCompletedLabel, formattedAmount };
};
