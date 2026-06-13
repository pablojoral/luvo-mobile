import { useTranslation } from 'react-i18next';

export const useBottomTabNavigatorStrings = () => {
  const { t } = useTranslation('common');

  return {
    tabTitles: {
      laundry: t('tabs.laundry'),
      history: t('tabs.history'),
      scan:    t('tabs.scan'),
      profile: t('tabs.profile'),
    },
  };
};
