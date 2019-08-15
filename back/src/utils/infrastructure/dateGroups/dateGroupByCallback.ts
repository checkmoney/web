import { format } from 'date-fns';

import { GroupBy } from '&shared/enum/GroupBy';

import { LogicException } from '../exception/LogicException';

export const dateGroupByCallback = (groupBy: GroupBy) => (date: Date) => {
  if (groupBy === GroupBy.Year) {
    return format(date, 'YYYY');
  }

  if (groupBy === GroupBy.Month) {
    return format(date, 'MMMM');
  }

  if (groupBy === GroupBy.Week) {
    return format(date, 'WW');
  }

  if (groupBy === GroupBy.Day) {
    return format(date, 'DD');
  }

  throw new LogicException('Unknown group by');
};
