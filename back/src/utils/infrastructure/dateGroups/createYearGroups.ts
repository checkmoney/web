import { range } from 'lodash';

import { DateRange } from '../dto/DateRange';
import { DateGroup } from './DateGroup';

export const createYearGroups = ({ from, to }: DateRange): DateGroup[] => {
  const firstYear = from.getFullYear();
  const lastYear = to.getFullYear();

  const years = range(firstYear, lastYear + 1);

  return years.map(year => ({
    title: year.toString(),
    from: new Date(`${year}-01-01`),
    to: new Date(`${year + 1}-01-01`),
  }));
};
