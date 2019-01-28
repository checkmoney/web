import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'

import { DateRange } from '@back/utils/infrastructure/dto/DateRange'

import { DateRangeQuery } from './DateRangeQuery'

@Injectable()
export class ParseDateRangePipe
  implements PipeTransform<DateRangeQuery, DateRange> {
  public transform(value: DateRangeQuery): DateRange {
    const from = this.parseDate(value.from)
    const to = this.parseDate(value.to)

    return new DateRange(from, to)
  }

  private supports(metadata: ArgumentMetadata) {
    return metadata.type === 'query' && metadata.metatype === DateRange
  }

  private parseDate(value?: string): Date {
    const date = new Date(value)

    if (!this.dateIsValid(date)) {
      throw Error()
    }

    return date
  }

  private dateIsValid(date: Date): boolean {
    return !isNaN(date.getTime())
  }
}
