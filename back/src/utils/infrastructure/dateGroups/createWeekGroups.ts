import { addWeeks, getISOWeek, startOfWeek } from 'date-fns'

import { DateRange } from '../dto/DateRange'
import { DateGroup } from './DateGroup'
import { getRealMonth } from './getRealMonth'

export const createWeekGroups = ({ from, to }: DateRange): DateGroup[] => {
  const groups = []

  let now = startOfWeek(from)
  while (now < to) {
    const next = addWeeks(now, 1)
    const nowYear = now.getFullYear()
    groups.push({
      title: `${nowYear}-${getRealMonth(now)}, week ${getISOWeek(now)}`,
      from: now,
      to: next,
    })

    now = next
  }

  return groups
}
