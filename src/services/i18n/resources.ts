import en from './locales/en/common.json';
import es from './locales/es/common.json';

// fr, pt, it intentionally omitted — they fall back to 'es' via fallbackLng
export const resources = {
  en: { common: en },
  es: { common: es },
} as const;
