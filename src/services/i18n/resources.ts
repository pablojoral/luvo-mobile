import en from './locales/en/common.json';
import es from './locales/es/common.json';
import it from './locales/it/common.json';
import pt from './locales/pt/common.json';
import fr from './locales/fr/common.json';

export const resources = {
  en: { common: en },
  es: { common: es },
  it: { common: it },
  pt: { common: pt },
  fr: { common: fr },
} as const;
