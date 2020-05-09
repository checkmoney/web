import { format } from 'date-fns';

export const translatedMonthTitle = (
  t: (key: string) => string,
  date: Date,
  withYear = true,
) => {
  const month = `${t(`months:${format(date, 'MM')}`)}`;

  if (withYear) {
    return `${month} ${format(date, 'YYYY')}`;
  }

  return month;
};
