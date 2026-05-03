export function formatAmount(
  amount: number | null,
  currency: string | null,
  locale: string,
  options?: Intl.NumberFormatOptions,
): string {
  if (amount === null) return 'Gratis';
  if (currency === null) return amount === 0 ? '0' : 'Gratis';
  try {
    const resolvedOptions: Intl.NumberFormatOptions = {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      ...options,
    };
    return new Intl.NumberFormat(locale, resolvedOptions).format(amount);
  } catch {
    return `$${amount} ${currency}`;
  }
}

export function formatDate(
  iso: string,
  locale: string,
  options?: Intl.DateTimeFormatOptions,
): string {
  const date = new Date(iso);
  const resolvedOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    ...options,
  };
  return date.toLocaleDateString(locale, resolvedOptions);
}

export function formatTime(iso: string, locale: string): string {
  const date = new Date(iso);
  return date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', hour12: false });
}

export function formatMonth(iso: string, locale: string): string {
  const date = new Date(iso);
  const label = date.toLocaleDateString(locale, { month: 'long', year: 'numeric' });
  return label.charAt(0).toUpperCase() + label.slice(1);
}
