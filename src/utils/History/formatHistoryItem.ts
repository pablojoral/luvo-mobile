import i18n from 'services/i18n/i18n';

export function formatAmount(amount: number | null, currency: string | null): string {
  if (amount === null || currency === null) return 'Gratis';
  try {
    return new Intl.NumberFormat(i18n.language, {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `$${amount} ${currency}`;
  }
}

export function formatDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString(i18n.language, { day: 'numeric', month: 'short' });
}
