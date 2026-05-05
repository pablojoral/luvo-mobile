import axios from 'axios';
import i18n from 'services/i18n/i18n';

export function classifyQueryError(error: unknown): string | null {
  if (!axios.isAxiosError(error)) return i18n.t('errors.generic');
  if (error.code === 'ECONNABORTED') return i18n.t('errors.timeout');
  if (!error.response) return i18n.t('errors.network');
  if (error.response.status === 401) return null;
  return i18n.t('errors.generic');
}
