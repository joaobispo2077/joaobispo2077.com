export function formatDate(
  date: Date,
  locale: string | string[] | undefined = 'en-us',
): string {
  const formattedDate = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(date);
  return formattedDate;
}
