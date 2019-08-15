import { addDays, format, startOfDay } from 'date-fns';

import { DateRange } from '../dto/DateRange';
import { DateGroup } from './DateGroup';

export const createDayGroups = ({ from, to }: DateRange): DateGroup[] => {
  const groups = [];

  let now = startOfDay(from);
  while (now < to) {
    const next = addDays(now, 1);
    groups.push({
      title: format(now, 'YYYY-MM-DD'),
      from: now,
      to: next,
    });

    now = next;
  }

  return groups;
};
