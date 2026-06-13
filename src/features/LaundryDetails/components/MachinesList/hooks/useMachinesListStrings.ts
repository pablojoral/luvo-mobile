import { useTranslation } from 'react-i18next';

export const useMachinesListStrings = () => {
  const { t } = useTranslation('common');

  return {
    filterAll: t('laundry.filters.all'),
    filterWashingMachine: t('laundry.filters.washing_machine'),
    filterDryer: t('laundry.filters.dryer'),
    machineCardLabels: {
      availability: {
        available:      t('machines.status.available'),
        'in-use':       t('machines.status.in_use'),
        'out-of-order': t('machines.status.out_of_order'),
        maintenance:    t('machines.status.maintenance'),
      },
      typeLabels: {
        washing_machine: t('machines.type.washing_machine'),
        dryer:           t('machines.type.dryer'),
      },
    },
  };
};
