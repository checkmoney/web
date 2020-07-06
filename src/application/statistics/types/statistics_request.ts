import { PeriodType, DateRange } from '&front/shared';

export interface StatisticsRequest {
  periodType: PeriodType;
  dateRange: DateRange;
}
