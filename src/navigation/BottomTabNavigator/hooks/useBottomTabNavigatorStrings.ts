import { useTranslation } from 'react-i18next';

export const useBottomTabNavigatorStrings = () => {
  const { t } = useTranslation('common');

  return {
    tabTitles: {
      laundry: t('tabs.laundry'),
      myLaundries: t('tabs.myLaundries'),
      profile: t('tabs.profile'),
    },
  };
};
