export function formatAmount(
  amount: number | null,
  currency: string | null,
  locale: string,
  options?: Intl.NumberFormatOptions,
): string {
  if (amount === null || currency === null) return 'Gratis';
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
