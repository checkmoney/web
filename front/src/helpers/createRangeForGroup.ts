import {
  startOfMonth,
  startOfYear,
  endOfYear,
  endOfMonth,
  subYears,
  subMonths,
} from 'date-fns'

import { GroupBy } from '$shared/enum/GroupBy'

import { wantUTC } from './wantUTC'

export const createRangeForGroup = (
  group: GroupBy,
  previousPeriodNumber = 0,
) => {
  const minus = wantUTC(group === GroupBy.Month ? subMonths : subYears)
  const now = minus(new Date(), previousPeriodNumber)

  const start = wantUTC(group === GroupBy.Month ? startOfMonth : startOfYear)
  const end = wantUTC(group === GroupBy.Month ? endOfMonth : endOfYear)

  return { from: start(now), to: end(now) }
}
