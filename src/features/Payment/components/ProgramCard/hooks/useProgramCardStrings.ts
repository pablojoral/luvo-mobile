import { useTranslation } from 'react-i18next';

export const useProgramCardStrings = () => {
  const { t } = useTranslation('common');
  return {
    coins: (count: number) => t('payment.program.coins', { count }),
  };
};
