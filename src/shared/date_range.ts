import { format } from 'date-fns';
import { Type } from 'class-transformer';

export class DateRange {
  @Type(() => Date)
  readonly start: Date;

  @Type(() => Date)
  readonly end: Date;

  constructor(start: Date, end: Date) {
    this.start = start;
    this.end = end;
  }

  get identity() {
    const pattern = 'YYYY-MM-DD';
    return `${format(this.start, pattern)}-${format(this.end, pattern)}`;
  }
}
