import { useTranslation } from 'react-i18next';

export const useProfileStrings = () => {
  const { t } = useTranslation('common');
  return {
    accountLabel:  t('profile.menu.account'),
    historyLabel:  t('profile.menu.history'),
    settingsLabel: t('profile.menu.settings'),
    infoLabel:     t('profile.menu.info'),
    reportLabel:   t('profile.menu.report'),
    authSubtitle:  t('auth.defaultSubtitle'),
  };
};
