import { startOfMonth, addMonths } from 'date-fns'
import { createMonthTitle } from './createMonthTitle'

export const createMonths = (from: Date, to: Date) => {
  const groups = []

  let now = startOfMonth(from)
  while (now < to) {
    const next = addMonths(now, 1)
    groups.push({
      title: createMonthTitle(now),
      from: now,
      to: next,
    })

    now = next
  }

  return groups
}
