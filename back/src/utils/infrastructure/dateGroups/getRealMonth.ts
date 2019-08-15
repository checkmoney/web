import { getMonth } from 'date-fns';

export const getRealMonth = (date: Date): string => {
  const monthNumber = getMonth(date) + 1;

  if (monthNumber < 10) {
    return `0${monthNumber}`;
  }

  return `${monthNumber}`;
};
