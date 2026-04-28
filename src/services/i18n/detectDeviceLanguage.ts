import { getLocales } from 'react-native-localize';
import { SUPPORTED_LANGUAGES } from './languages';
import type { SupportedLanguage } from './languages';

const SUPPORTED_CODES = new Set<string>(SUPPORTED_LANGUAGES.map(l => l.code));

function isSupportedLanguage(code: string): code is SupportedLanguage {
  return SUPPORTED_CODES.has(code);
}

export function detectDeviceLanguage(): SupportedLanguage {
  const locales = getLocales();
  for (const locale of locales) {
    if (isSupportedLanguage(locale.languageCode)) {
      return locale.languageCode;
    }
  }
  return 'es';
}
