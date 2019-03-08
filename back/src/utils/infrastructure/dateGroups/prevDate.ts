import { GroupBy } from '@shared/enum/GroupBy'
import {
  subWeeks,
  endOfWeek,
  endOfMonth,
  subMonths,
  endOfYear,
  subYears,
} from 'date-fns'
import { LogicException } from '../exception/LogicException'

export const prevDate = (groupBy: GroupBy) => {
  if (groupBy === GroupBy.Year) {
    return endOfYear(subYears(new Date(), 1))
  }

  if (groupBy === GroupBy.Month) {
    return endOfMonth(subMonths(new Date(), 1))
  }

  if (groupBy === GroupBy.Week) {
    return endOfWeek(subWeeks(new Date(), 1))
  }

  throw new LogicException('Unknown group by')
}
