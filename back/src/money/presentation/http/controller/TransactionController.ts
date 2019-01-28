import { Body, Controller, Post } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiUseTags,
} from '@nestjs/swagger'

import { IncomeRequest } from '../request/IncomeRequest'
import { OutcomeRequest } from '../request/OutcomeRequest'
import { IncomeResponse } from '../response/IncomeResponse'
import { OutcomeResponse } from '../response/OutcomeResponse'

@Controller('money/transaction')
@ApiUseTags('money')
@ApiBearerAuth()
export class TransactionController {
  @Post('income')
  @ApiOperation({ title: 'Create new income transaction' })
  @ApiCreatedResponse({
    description: 'Transaction created',
    type: IncomeResponse,
  })
  public async income(@Body() request: IncomeRequest): Promise<IncomeResponse> {
    const { amount, currency, source, date } = request

    return {
      amount,
      currency,
      source,
      date,
    }
  }

  @Post('outcome')
  @ApiOperation({ title: 'Create new outcome transaction' })
  @ApiCreatedResponse({
    description: 'Transaction created',
    type: OutcomeResponse,
  })
  public async outcome(
    @Body() request: OutcomeRequest,
  ): Promise<OutcomeResponse> {
    const { amount, currency, category, date } = request

    return {
      amount,
      currency,
      category,
      date,
    }
  }
}
