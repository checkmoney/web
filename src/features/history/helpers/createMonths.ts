import { startOfMonth, addMonths, endOfMonth } from 'date-fns';

import { translatedMonthTitle } from '&front/helpers/translatedMonthTitle';
import { wantUTC } from '&front/helpers/wantUTC';

export const createMonths = (
  t: (key: string) => string,
  from: Date,
  to: Date,
) => {
  const groups = [];

  let now = wantUTC(startOfMonth)(from);
  while (now < to) {
    const next = wantUTC(startOfMonth)(wantUTC(addMonths)(now, 1));
    groups.push({
      title: translatedMonthTitle(t, now),
      from: now,
      to: wantUTC(endOfMonth)(now),
    });

    now = next;
  }

  return groups;
};
