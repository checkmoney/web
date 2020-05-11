import { format } from 'date-fns';
import ru from 'date-fns/locale/ru';

export const translatedMonthTitle = (date: Date, withYear = true) => {
  const month = format(date, 'MMM', { locale: ru });

  if (withYear) {
    return `${month} ${format(date, 'YYYY')}`;
  }

  return month;
};
