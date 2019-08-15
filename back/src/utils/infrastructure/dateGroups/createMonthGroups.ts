import { addMonths, startOfMonth, subMonths } from 'date-fns';

import { DateRange } from '../dto/DateRange';
import { DateGroup } from './DateGroup';
import { getRealMonth } from './getRealMonth';

export const createMonthGroups = ({ from, to }: DateRange): DateGroup[] => {
  const groups = [];

  let now = startOfMonth(from);
  while (now < to) {
    const next = startOfMonth(addMonths(now, 1));
    const nowYear = now.getFullYear();
    groups.push({
      title: `${nowYear}-${getRealMonth(now)}`,
      from: now,
      to: next,
    });

    now = next;
  }

  return groups;
};
