enum PeriodType {
  Week = 'week',
  Month = 'month',
  Year = 'year',
  Day = 'day',
}

type Config<T> = { [key in PeriodType]: T };

const matchPeriod = <T>(config: Config<T>, period: PeriodType) =>
  config[period];

export { PeriodType, matchPeriod };
