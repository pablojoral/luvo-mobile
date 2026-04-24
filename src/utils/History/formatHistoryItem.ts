export function formatAmount(amount: number | null, currency: string | null): string {
  if (amount === null || currency === null) return 'Gratis';
  try {
    return new Intl.NumberFormat('es-UY', {
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
  return date.toLocaleDateString('es-UY', { day: 'numeric', month: 'short' });
}
