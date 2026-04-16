import {
  estimateReadTime,
  formatDate,
  getMonthsDifferenceFromDates,
  getRevalidateInDays,
  getYearsDifferenceFromDates,
} from '@src/utils/date';

describe('date utils', () => {
  it('formats date with default locale', () => {
    const value = formatDate(new Date('2026-03-27T00:00:00.000Z'));
    expect(value).toBeTruthy();
  });

  it('formats date with custom locale/options', () => {
    const value = formatDate(new Date('2026-03-27T00:00:00.000Z'), 'en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    expect(value).toContain('2026');
  });

  it('calculates revalidate seconds for day count', () => {
    expect(getRevalidateInDays(7)).toBe(604800);
  });

  it('calculates months difference from two dates', () => {
    expect(getMonthsDifferenceFromDates('2024-01-01', '2024-03-15')).toBe(3);
  });

  it('calculates years difference from two dates', () => {
    expect(getYearsDifferenceFromDates('2020-01-01', '2023-12-31')).toBe(4);
  });

  it('estimates read time from html content', () => {
    const html = `<p>${'word '.repeat(401)}</p>`;
    expect(estimateReadTime(html)).toBe(3);
  });
});

