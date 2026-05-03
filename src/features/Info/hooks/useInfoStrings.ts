import { useTranslation } from 'react-i18next';

export const useInfoStrings = () => {
  const { t } = useTranslation('common');
  return {
    title:      t('info.title'),
    termsLabel: t('info.menu.terms'),
    faqLabel:   t('info.menu.faq'),
    aboutLabel: t('info.menu.about'),
  };
};
