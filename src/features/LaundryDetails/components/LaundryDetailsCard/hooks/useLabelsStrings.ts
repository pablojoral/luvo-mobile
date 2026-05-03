import { useTranslation } from 'react-i18next';

export const useLabelsStrings = () => {
  const { t } = useTranslation('common');

  return {
    availabilityLabel: (available: number, total: number) =>
      t('laundry.availability', { available, total }),
    directionsLabel: t('laundry.directions'),
  };
};
