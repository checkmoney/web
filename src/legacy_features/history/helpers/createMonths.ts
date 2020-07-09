import { startOfMonth, addMonths, endOfMonth } from 'date-fns';

import { wantUTC, getTranslatedMonthTitle } from '&front/shared';

interface Month {
  title: string;
  from: Date;
  to: Date;
}

export const createMonths = (from: Date, to: Date) => {
  const groups: Month[] = [];

  let now = wantUTC(startOfMonth)(from);
  while (now < to) {
    const next = wantUTC(startOfMonth)(wantUTC(addMonths)(now, 1));
    groups.push({
      title: getTranslatedMonthTitle(now),
      from: now,
      to: wantUTC(endOfMonth)(now),
    });

    now = next;
  }

  return groups;
};
