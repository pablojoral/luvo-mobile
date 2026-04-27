import en from './locales/en/common.json';
import es from './locales/es/common.json';
import pt from './locales/pt/common.json';

// fr, it intentionally omitted — they fall back to 'es' via fallbackLng
export const resources = {
  en: { common: en },
  es: { common: es },
  pt: { common: pt },
} as const;
