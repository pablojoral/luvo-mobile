import { useTranslation } from 'react-i18next';

export const useLanguagePickerStrings = () => {
  const { t } = useTranslation('common');

  return {
    pickerTitle: t('settings.language.pickerTitle'),
  };
};
