import {
  format,
  subMonths,
  subYears,
  startOfYear,
  startOfMonth,
  endOfMonth,
  endOfYear,
  subWeeks,
  subDays,
  startOfWeek,
  startOfDay,
  endOfWeek,
  endOfDay,
} from 'date-fns';
import { Type } from 'class-transformer';
import { memoize } from 'lodash';

import { PeriodType, matchPeriod } from './period_type';
import { wantUTC } from './utc';

export class DateRange {
  @Type(() => Date)
  readonly start: Date;

  @Type(() => Date)
  readonly end: Date;

  constructor(start: Date, end: Date) {
    this.start = start;
    this.end = end;
  }

  static createUtcPeriod(periodType: PeriodType, substractPeriodAmount = 0) {
    const minus = matchPeriod(
      {
        [PeriodType.Year]: wantUTC(subYears),
        [PeriodType.Month]: wantUTC(subMonths),
        [PeriodType.Week]: wantUTC(subWeeks),
        [PeriodType.Day]: wantUTC(subDays),
      },
      periodType,
    );

    const start = matchPeriod(
      {
        [PeriodType.Year]: wantUTC(startOfYear),
        [PeriodType.Month]: wantUTC(startOfMonth),
        [PeriodType.Week]: wantUTC(startOfWeek),
        [PeriodType.Day]: wantUTC(startOfDay),
      },
      periodType,
    );

    const end = matchPeriod(
      {
        [PeriodType.Year]: wantUTC(endOfYear),
        [PeriodType.Month]: wantUTC(endOfMonth),
        [PeriodType.Week]: wantUTC(endOfWeek),
        [PeriodType.Day]: wantUTC(endOfDay),
      },
      periodType,
    );

    const now = minus(new Date(), substractPeriodAmount);

    return this.memoized(start(now), end(now));
  }

  static memoized = memoize(
    (start: Date, end: Date) => {
      return new DateRange(start, end);
    },
    (...dates: Date[]) =>
      dates.map((date) => date.valueOf().toString()).join('-'),
  );

  get identity() {
    const pattern = 'YYYY-MM-DD';
    return [this.start, this.end]
      .map((date) => format(date, pattern))
      .join('-');
  }
}
