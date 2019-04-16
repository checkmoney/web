import { startOfMonth, startOfYear, endOfYear, endOfMonth } from 'date-fns'

import { GroupBy } from '@shared/enum/GroupBy'

import { wantUTC } from './wantUTC'

export const createRangeForGroup = (group: GroupBy) => {
  const start = group === GroupBy.Month ? startOfMonth : startOfYear
  const end = group === GroupBy.Month ? endOfMonth : endOfYear

  return { from: wantUTC(start)(new Date()), to: wantUTC(end)(new Date()) }
}
