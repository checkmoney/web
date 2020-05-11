import { Type } from 'class-transformer';

export class Interval {
  @Type(() => Date)
  readonly start: Date;

  @Type(() => Date)
  readonly end: Date;

  constructor(start: Date, end: Date) {
    this.start = start;
    this.end = end;
  }
}
