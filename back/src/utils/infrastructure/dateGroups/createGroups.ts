import { GroupBy } from '&shared/enum/GroupBy';

import { createDayGroups } from './createDayGroups';
import { createMonthGroups } from './createMonthGroups';
import { createWeekGroups } from './createWeekGroups';
import { createYearGroups } from './createYearGroups';

export const createGroups = (groupBy: GroupBy) =>
  ({
    [GroupBy.Year]: createYearGroups,
    [GroupBy.Month]: createMonthGroups,
    [GroupBy.Week]: createWeekGroups,
    [GroupBy.Day]: createDayGroups,
  }[groupBy]);
