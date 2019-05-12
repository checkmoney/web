import { startOfMonth, addMonths, endOfMonth } from 'date-fns'

import { wantUTC } from '@front/helpers/wantUTC'

import { createMonthTitle } from './createMonthTitle'

export const createMonths = (
  t: (key: string) => string,
  from: Date,
  to: Date,
) => {
  const groups = []

  let now = wantUTC(startOfMonth)(from)
  while (now < to) {
    const next = wantUTC(startOfMonth)(wantUTC(addMonths)(now, 1))
    groups.push({
      title: createMonthTitle(t, now),
      from: now,
      to: wantUTC(endOfMonth)(now),
    })

    now = next
  }

  return groups
}
