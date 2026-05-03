import { useTranslation } from 'react-i18next';

export const useStatsHeaderStrings = () => {
  const { t } = useTranslation('common');

  return {
    spentThisMonthLabel: t('history.stats.spentThisMonth'),
    cyclesCompleted: (count: number) => t('history.stats.cyclesCompleted', { count }),
  };
};
