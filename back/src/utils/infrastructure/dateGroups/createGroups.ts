import { GroupBy } from '@shared/enum/GroupBy'

import { createMonthGroups } from './createMonthGroups'
import { createWeekGroups } from './createWeekGroups'
import { createYearGroups } from './createYearGroups'
import { createDayGroups } from './createDayGroups'

export const createGroups = (groupBy: GroupBy) =>
  ({
    [GroupBy.Year]: createYearGroups,
    [GroupBy.Month]: createMonthGroups,
    [GroupBy.Week]: createWeekGroups,
    [GroupBy.Day]: createDayGroups,
  }[groupBy])
