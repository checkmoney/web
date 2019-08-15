import { Injectable, PipeTransform } from '@nestjs/common';

import { LogicException } from '&back/utils/infrastructure/exception/LogicException';

@Injectable()
export class JsonParsePipe implements PipeTransform<string, any> {
  public transform(value: string) {
    try {
      const parsed = JSON.parse(value);

      return parsed;
    } catch (error) {
      throw new LogicException('Unexpected usage of JsonParsePipe');
    }
  }
}
