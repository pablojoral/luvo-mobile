import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { detectDeviceLanguage } from './detectDeviceLanguage';
import { resources } from './resources';

i18n.use(initReactI18next).init({
  resources,
  lng: detectDeviceLanguage(),
  fallbackLng: 'es',
  defaultNS: 'common',
  compatibilityJSON: 'v4',
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
  returnNull: false,
}).catch((err: unknown) => {
  console.error('[i18n] init failed', err);
});

export default i18n;
