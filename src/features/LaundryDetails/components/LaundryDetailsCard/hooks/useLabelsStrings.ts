import { useTranslation } from 'react-i18next';

export const useLabelsStrings = () => {
  const { t } = useTranslation('common');

  return {
    availabilityLabel: (available: number, total: number) =>
      t('laundry.availability', { available, total }),
    directionsLabel: t('laundry.directions'),
    concurrencyLabels: {
      low:    t('laundry.concurrency.low'),
      medium: t('laundry.concurrency.medium'),
      high:   t('laundry.concurrency.high'),
      none:   t('laundry.concurrency.none'),
    },
  };
};
