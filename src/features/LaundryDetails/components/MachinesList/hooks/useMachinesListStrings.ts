import { useTranslation } from 'react-i18next';

export const useMachinesListStrings = () => {
  const { t } = useTranslation('common');

  return {
    filterAll: t('laundry.filters.all'),
    filterWashingMachine: t('laundry.filters.washing_machine'),
    filterDryer: t('laundry.filters.dryer'),
  };
};
