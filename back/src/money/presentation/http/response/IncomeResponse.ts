import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

import { Income } from '&back/money/domain/Income.entity';
import { Currency } from '&shared/enum/Currency';
import { IncomeModel } from '&shared/models/money/IncomeModel';

export class IncomeResponse implements IncomeModel {
  public static fromEntity(income: Income): IncomeResponse {
    return income;
  }

  @ApiModelProperty({ example: 1000 })
  public readonly amount: number;

  @ApiModelProperty({ example: Currency.RUB, enum: Object.values(Currency) })
  public readonly currency: Currency;

  @ApiModelProperty({ example: 'NASA' })
  public readonly source: string;

  @ApiModelPropertyOptional({ example: new Date() })
  public readonly date?: Date;
}
