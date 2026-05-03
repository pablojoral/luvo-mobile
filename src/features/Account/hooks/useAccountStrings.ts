import { useTranslation } from 'react-i18next';

export const useAccountStrings = (isDeleting: boolean) => {
  const { t } = useTranslation('common');
  return {
    screenTitle:              t('account.title'),
    nameLabel:                t('account.profile.sectionTitle'),
    namePlaceholder:          t('account.profile.namePlaceholder'),
    nameRequired:             t('account.profile.nameRequired'),
    emailLabel:               t('account.emailLabel'),
    clientLabel:              t('account.clientLabel'),
    securitySection:          t('account.security.sectionTitle'),
    resetPassword:            t('account.security.resetPassword'),
    sessionSection:           t('profile.menu.signOut'),
    signOut:                  t('profile.menu.signOut'),
    deleteButtonLabel:        isDeleting ? t('account.deleteAccount.deleting') : t('account.deleteAccount.label'),
    deleteConfirmTitle:       t('account.alerts.deleteConfirmTitle'),
    deleteConfirmBody:        t('account.alerts.deleteConfirmBody'),
    deleteConfirmDelete:      t('account.alerts.deleteConfirmDelete'),
    deleteConfirmCancel:      t('account.alerts.deleteConfirmCancel'),
    signOutConfirmTitle:      t('profile.menu.signOut'),
    signOutConfirmBody:       t('auth.defaultSubtitle'),
    signOutConfirmConfirm:    t('profile.menu.signOut'),
    signOutConfirmCancel:     t('actions.cancel'),
    genericError:             t('errors.generic'),
    saveFailed:               t('account.messages.saveFailed'),
    passwordResetSent:        t('account.messages.passwordResetSent'),
    passwordResetSentBody:    (email: string) => t('account.messages.passwordResetSentBody', { email }),
    passwordResetFailed:      t('account.messages.passwordResetFailed'),
    signOutFailed:            t('account.messages.signOutFailed'),
    deleteFailed:             t('account.messages.deleteFailed'),
  };
};
