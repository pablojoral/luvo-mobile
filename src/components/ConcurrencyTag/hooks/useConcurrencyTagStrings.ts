import { useTranslation } from 'react-i18next';

type ConcurrencyLevel = 'low' | 'medium' | 'high' | 'none';

export const useConcurrencyTagStrings = (level: ConcurrencyLevel) => {
  const { t } = useTranslation('common');

  return {
    label: t(`laundry.concurrency.${level}`),
  };
};
