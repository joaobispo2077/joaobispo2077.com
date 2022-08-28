export type ManipulateDatesSignature = (
  startDate: string | Date,
  endDate?: string | Date | null,
) => number;

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

export const getMonthsDifferenceFromDates: ManipulateDatesSignature = (
  startDate,
  endDate = new Date(),
) => {
  const endDateReceived = endDate ? new Date(endDate) : new Date();
  const difference = Math.abs(
    new Date(endDateReceived).getTime() - new Date(startDate).getTime(),
  );
  return Math.ceil(difference / (1000 * 3600 * 24 * 30));
};

export const getYearsDifferenceFromDates: ManipulateDatesSignature = (
  startDate,
  endDate = new Date(),
) => {
  const monthsDifference = getMonthsDifferenceFromDates(startDate, endDate);
  return Math.floor(monthsDifference / 12);
};
