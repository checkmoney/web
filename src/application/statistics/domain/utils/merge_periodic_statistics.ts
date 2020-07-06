import { uniqBy } from 'lodash';

import { DateRange, PeriodType } from '&front/shared';

interface StatisticsItem {
  period: DateRange;
}

type Statistics<T extends StatisticsItem> = { [key in PeriodType]?: T[] };

export const mergePeriodicStatistics = <T extends StatisticsItem>(
  original: Statistics<T>,
  periodType: PeriodType,
  newItems: T[],
): Statistics<T> => ({
  ...original,
  [periodType]: uniqBy<T>(
    [...(original[periodType] || []), ...newItems],
    (item) => item.period.identity,
  ),
});
