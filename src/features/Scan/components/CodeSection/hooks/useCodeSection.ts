import { useTranslation } from 'react-i18next';

export const useCodeSection = () => {
  const { t } = useTranslation('common');

  return {
    title: t('scan.codeSection.title'),
    buttonLabel: t('scan.codeSection.submit'),
  };
};
