import { useTranslation } from 'react-i18next';
import type { MachineType } from 'models/models';

export const useMachineDetailsStrings = () => {
  const { t } = useTranslation('common');
  return {
    screenTitle:      t('machines.title'),
    notFoundText:     t('machines.notFound'),
    goBackLabel:      t('machines.goBack'),
    startWashLabel:   t('machines.startWash'),
    notifyLabel:      t('machines.notify'),
    reportProblemLabel: t('machines.reportProblem'),
    typeLabels: {
      washing_machine: t('machines.type.washing_machine'),
      dryer:           t('machines.type.dryer'),
    } as Record<MachineType, string>,
  };
};
