import { useTranslation } from 'react-i18next';

export const useAccountGoogleLinkStrings = () => {
  const { t } = useTranslation('common');
  return {
    google:         t('account.providers.google'),
    linked:         t('account.linkedAccounts.linkedBadge'),
    link:           t('account.linkedAccounts.link'),
    unlinkTitle:    t('account.linkedAccounts.unlinkGoogleTitle'),
    unlinkBody:     t('account.linkedAccounts.unlinkGoogleBody'),
    unlinkConfirm:  t('account.linkedAccounts.unlinkGoogleConfirm'),
    unlinkCancel:   t('actions.cancel'),
    genericError:   t('errors.generic'),
    linkFailed:     t('account.messages.linkGoogleFailed'),
    unlinkFailed:   t('account.messages.unlinkGoogleFailed'),
  };
};
