import { getDayOfYear, getDay, getDaysInYear, getDaysInMonth } from 'date-fns'

import { GroupBy } from '&shared/enum/GroupBy'

export const calculateGroupProgress = (group: GroupBy): number => {
  const now = new Date()

  if (group === GroupBy.Year) {
    return getDayOfYear(now) / getDaysInYear(now)
  }

  if (group === GroupBy.Month) {
    return now.getDate() / getDaysInMonth(now)
  }

  if (group === GroupBy.Week) {
    return getDay(now) / 7
  }

  return 1
}
