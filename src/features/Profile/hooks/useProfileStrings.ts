import { useTranslation } from 'react-i18next';

export const useProfileStrings = () => {
  const { t } = useTranslation('common');
  return {
    title:               t('tabs.profile'),
    accountLabel:        t('profile.menu.account'),
    historyLabel:        t('profile.menu.history'),
    settingsLabel:       t('profile.menu.settings'),
    infoLabel:           t('profile.menu.info'),
    reportLabel:         t('profile.menu.report'),
    authSubtitle:        t('auth.defaultSubtitle'),
    authDefaultSubtitle: t('auth.defaultSubtitle'),
    authTitle:           t('auth.title'),
    authSignInLabel:     t('auth.signIn'),
    profileLoadError:    t('errors.profileLoad.body'),
  };
};
