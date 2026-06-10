import { useTranslation } from 'react-i18next';

export const useAccountAppleLinkStrings = () => {
  const { t } = useTranslation('common');
  return {
    apple:          t('account.providers.apple'),
    linked:         t('account.linkedAccounts.linkedBadge'),
    link:           t('account.linkedAccounts.link'),
    unlinkTitle:    t('account.linkedAccounts.unlinkTitle'),
    unlinkBody:     t('account.linkedAccounts.unlinkBody'),
    unlinkConfirm:  t('account.linkedAccounts.unlinkConfirm'),
    unlinkCancel:   t('actions.cancel'),
    genericError:   t('errors.generic'),
    linkFailed:     t('account.messages.linkFailed'),
    unlinkFailed:   t('account.messages.unlinkFailed'),
  };
};
