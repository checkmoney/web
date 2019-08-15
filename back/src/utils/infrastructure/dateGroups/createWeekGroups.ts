import { addWeeks, startOfWeek, format } from 'date-fns';

import { DateRange } from '../dto/DateRange';
import { DateGroup } from './DateGroup';

export const createWeekGroups = ({ from, to }: DateRange): DateGroup[] => {
  const groups = [];

  let now = startOfWeek(from);
  while (now < to) {
    const next = startOfWeek(addWeeks(now, 1));
    groups.push({
      title: format(now, 'YYYY-MM-DD'),
      from: now,
      to: next,
    });

    now = next;
  }

  return groups;
};
