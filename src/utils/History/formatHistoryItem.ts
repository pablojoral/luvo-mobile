export function formatAmount(amount: number | null, currency: string | null, locale: string): string {
  if (amount === null || currency === null) return 'Gratis';
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `$${amount} ${currency}`;
  }
}

export function formatDate(iso: string, locale: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString(locale, { day: 'numeric', month: 'short' });
}
