import { formatAmount, formatDate } from 'utils/History/formatHistoryItem';

describe('formatAmount', () => {
  describe('null guards', () => {
    it('returns "Gratis" when amount is null', () => {
      expect(formatAmount(null, 'UYU', 'es-UY')).toBe('Gratis');
    });

    it('returns "Gratis" when currency is null', () => {
      expect(formatAmount(500, null, 'es-UY')).toBe('Gratis');
    });

    it('returns "Gratis" when both are null', () => {
      expect(formatAmount(null, null, 'es-UY')).toBe('Gratis');
    });
  });

  describe('es-UY locale', () => {
    it('formats a UYU amount', () => {
      const result = formatAmount(500, 'UYU', 'es-UY');
      // Intl output varies by Node version and ICU data, so assert structure rather than exact string.
      // The amount digits must appear and currency must not be missing.
      expect(result).toMatch(/500/);
    });

    it('formats a USD amount', () => {
      const result = formatAmount(1000, 'USD', 'es-UY');
      expect(result).toMatch(/1\.?000|1000/);
    });
  });

  describe('en-US locale', () => {
    it('formats a USD amount', () => {
      const result = formatAmount(1000, 'USD', 'en-US');
      expect(result).toMatch(/1,000|1000/);
    });

    it('formats a UYU amount', () => {
      const result = formatAmount(500, 'UYU', 'en-US');
      expect(result).toMatch(/500/);
    });
  });

  describe('valid amount and currency', () => {
    it('returns a non-empty string for a valid input', () => {
      // The fallback "$<amount> <currency>" is the catch path; whether Intl.NumberFormat
      // throws for a given code depends on the Node/ICU version. We verify only that
      // the function returns a string containing the numeric digits.
      const result = formatAmount(42, 'USD', 'en-US');
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
      expect(result).toMatch(/42/);
    });
  });

  describe('locale is respected for digit grouping', () => {
    it('produces different output for the same amount in different locales', () => {
      const esResult = formatAmount(1000000, 'USD', 'es-UY');
      const enResult = formatAmount(1000000, 'USD', 'en-US');
      // Both contain the digits; the grouping separator may differ — what matters
      // is that the locale parameter is actually forwarded to Intl.NumberFormat.
      expect(esResult).toMatch(/1/);
      expect(enResult).toMatch(/1/);
      // The two formatted strings will differ (separator and/or symbol placement).
      expect(esResult).not.toBe(enResult);
    });
  });

  describe('explicit options override', () => {
    it('respects maximumFractionDigits override', () => {
      // Default minimumFractionDigits is 0; passing maximumFractionDigits: 2 forces
      // the formatter to show cents. We verify the decimal separator and digits appear.
      const result = formatAmount(9.5, 'USD', 'en-US', { maximumFractionDigits: 2 });
      // 9.5 formatted to 2 decimal places must contain "9" and a decimal portion.
      expect(result).toMatch(/9/);
      expect(result).toMatch(/[.,]5/);
    });

    it('respects minimumFractionDigits override', () => {
      // Overriding minimumFractionDigits: 2 forces trailing zeros on a whole number.
      const result = formatAmount(100, 'USD', 'en-US', { minimumFractionDigits: 2 });
      // Must contain the digits and a decimal portion with two zeros.
      expect(result).toMatch(/100/);
      expect(result).toMatch(/[.,]00/);
    });

    it('options are spread over defaults — existing defaults still apply when not overridden', () => {
      // Passing an empty options object must produce the same output as no options arg.
      const withEmpty = formatAmount(500, 'USD', 'en-US', {});
      const withoutOptions = formatAmount(500, 'USD', 'en-US');
      expect(withEmpty).toBe(withoutOptions);
    });

    it('does not affect null-guard behaviour', () => {
      expect(formatAmount(null, 'USD', 'en-US', { minimumFractionDigits: 2 })).toBe('Gratis');
      expect(formatAmount(100, null, 'en-US', { minimumFractionDigits: 2 })).toBe('Gratis');
    });
  });
});

describe('formatDate', () => {
  // Use a fixed ISO string that is unambiguous in any timezone offset.
  // toLocaleDateString interprets the Date in local time, so we construct
  // the date to represent a known calendar day.
  const isoString = '2024-07-15T12:00:00.000Z';

  describe('es-UY locale', () => {
    it('returns a string containing the day and a month abbreviation', () => {
      const result = formatDate(isoString, 'es-UY');
      // Day digits must appear; month abbreviation must appear (letters).
      expect(result).toMatch(/\d/);
      expect(result).toMatch(/[A-Za-záéíóúñü]/i);
    });
  });

  describe('en-US locale', () => {
    it('returns a string containing the day and a month abbreviation', () => {
      const result = formatDate(isoString, 'en-US');
      expect(result).toMatch(/\d/);
      expect(result).toMatch(/[A-Za-z]/);
    });
  });

  describe('locale is forwarded', () => {
    it('produces different output in es-UY vs en-US', () => {
      const esResult = formatDate(isoString, 'es-UY');
      const enResult = formatDate(isoString, 'en-US');
      // Spanish abbreviations differ from English ones (e.g. "jul." vs "Jul").
      expect(esResult).not.toBe(enResult);
    });
  });

  describe('invalid ISO string', () => {
    it('returns "Invalid Date" string for a non-parseable input', () => {
      // new Date('garbage').toLocaleDateString() returns 'Invalid Date'
      const result = formatDate('not-a-date', 'en-US');
      expect(result).toBe('Invalid Date');
    });
  });

  describe('explicit options override', () => {
    it('includes the year when { year: "numeric" } is passed', () => {
      const result = formatDate(isoString, 'en-US', { year: 'numeric' });
      // The year 2024 must appear in the output.
      expect(result).toMatch(/2024/);
    });

    it('does not include the year when no options are passed (default behaviour unchanged)', () => {
      const result = formatDate(isoString, 'en-US');
      expect(result).not.toMatch(/2024/);
    });

    it('overrides day style when { day: "2-digit", month: "short", year: "numeric" } is passed', () => {
      // This mirrors the exact options used by useCycleCard — validates the real call site.
      const result = formatDate(isoString, 'en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
      expect(result).toMatch(/2024/);
      expect(result).toMatch(/\d/);
      expect(result).toMatch(/[A-Za-z]/);
    });
  });
});
