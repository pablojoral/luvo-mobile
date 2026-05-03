import { useTranslation } from 'react-i18next';

export const useMyLaundryItemStrings = () => {
  const { t } = useTranslation('common');

  return {
    noMachines: t('myLaundries.item.noMachines'),
    available: (available: number, total: number) =>
      t('myLaundries.item.available', { available, total }),
    privateTag: t('myLaundries.item.tags.private'),
    mainTag: t('myLaundries.item.tags.main'),
  };
};
