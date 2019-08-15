import { Body, Controller, Post, Query, Delete, Param } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiUseTags,
  ApiOkResponse,
} from '@nestjs/swagger';

import { Accountant } from '&back/money/application/Accountant';
import { CurrentUser } from '&back/user/presentation/http/decorator/CurrentUser';
import { OnlyForUsers } from '&back/user/presentation/http/security/OnlyForUsers';
import { TokenPayloadModel } from '&shared/models/user/TokenPayloadModel';

import { IncomeRequest } from '../request/IncomeRequest';
import { OutcomeRequest } from '../request/OutcomeRequest';
import { IncomeResponse } from '../response/IncomeResponse';
import { OutcomeResponse } from '../response/OutcomeResponse';

@Controller('money/transaction')
@OnlyForUsers()
@ApiUseTags('money')
@ApiBearerAuth()
export class TransactionController {
  public constructor(private readonly accountant: Accountant) {}

  @Post('income')
  @ApiOperation({ title: 'Create new income transaction' })
  @ApiCreatedResponse({
    description: 'Transaction created',
    type: IncomeResponse,
  })
  public async income(
    @Body() request: IncomeRequest,
    @CurrentUser() { login }: TokenPayloadModel,
  ): Promise<IncomeResponse> {
    await this.accountant.income(login, request);

    return request;
  }

  @Post('outcome')
  @ApiOperation({ title: 'Create new outcome transaction' })
  @ApiCreatedResponse({
    description: 'Transaction created',
    type: OutcomeResponse,
  })
  public async outcome(
    @Body() request: OutcomeRequest,
    @CurrentUser() { login }: TokenPayloadModel,
  ): Promise<OutcomeResponse> {
    await this.accountant.outcome(login, request);

    return request;
  }

  @Delete('/:id')
  @ApiOperation({ title: 'Delete transaction' })
  @ApiOkResponse({ description: 'Transaction deleted' })
  public async remove(
    @Param('id') id: string,
    @CurrentUser() { login }: TokenPayloadModel,
  ) {
    await this.accountant.remove(id, login);
  }
}
