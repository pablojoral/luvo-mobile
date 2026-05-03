import { useTranslation } from 'react-i18next';

export const useAvatarPickerStrings = () => {
  const { t } = useTranslation('common');

  return {
    title: t('account.avatarPicker.title'),
  };
};
