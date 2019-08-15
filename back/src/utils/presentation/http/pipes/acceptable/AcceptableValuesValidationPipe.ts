import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class AcceptableValuesValidationPipe
  implements PipeTransform<string, string> {
  public constructor(private readonly acceptableValues: string[]) {}

  public transform(value: string): string {
    if (!this.acceptableValues.includes(value)) {
      throw new BadRequestException(
        `Not acceptable value, expected: [${this.acceptableValues.join(', ')}]`,
      );
    }

    return value;
  }
}
