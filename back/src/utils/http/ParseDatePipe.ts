import { Injectable, PipeTransform } from '@nestjs/common'

@Injectable()
export class ParseDatePipe implements PipeTransform<string, Date> {
  public transform(value: string): Date {
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
