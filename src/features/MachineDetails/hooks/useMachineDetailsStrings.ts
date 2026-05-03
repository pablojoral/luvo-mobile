import { useTranslation } from 'react-i18next';
import type { MachineStatus, MachineType } from 'models/models';

export const useMachineDetailsStrings = () => {
  const { t } = useTranslation('common');
  return {
    screenTitle:      t('machines.title'),
    notFoundText:     t('machines.notFound'),
    goBackLabel:      t('machines.goBack'),
    modelLabel:       t('machines.model'),
    startWashLabel:   t('machines.startWash'),
    reportProblemLabel: t('machines.reportProblem'),
    typeLabels: {
      washing_machine: t('machines.type.washing_machine'),
      dryer:           t('machines.type.dryer'),
    } as Record<MachineType, string>,
    statusLabels: {
      available:    t('machines.status.available'),
      in_use:       t('machines.status.in_use'),
      out_of_order: t('machines.status.out_of_order'),
      maintenance:  t('machines.status.maintenance'),
    } as Record<MachineStatus, string>,
  };
};
