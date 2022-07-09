export function formatDate(
  date: Date,
  locale: string | string[] | undefined = 'en-us',
  options: Intl.DateTimeFormatOptions = {},
): string {
  const formattedDate = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    ...options,
  }).format(new Date(date));
  return formattedDate;
}

export const getRevalidateInDays = (days: number) => {
  return 60 * 60 * 24 * days;
};
