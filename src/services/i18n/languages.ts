export type SupportedLanguage = 'es' | 'en' | 'fr' | 'pt' | 'it';

export interface LanguageOption {
  code: SupportedLanguage;
  label: string;
  nativeLabel: string;
}

export const SUPPORTED_LANGUAGES: readonly LanguageOption[] = [
  { code: 'es', label: 'Español',   nativeLabel: 'Español' },
  { code: 'en', label: 'English',   nativeLabel: 'English' },
  { code: 'fr', label: 'Français',  nativeLabel: 'Français' },
  { code: 'pt', label: 'Português', nativeLabel: 'Português' },
  { code: 'it', label: 'Italiano',  nativeLabel: 'Italiano' },
] as const;

export function getLanguageLabel(code: string): string {
  return SUPPORTED_LANGUAGES.find(l => l.code === code)?.nativeLabel ?? code;
}
