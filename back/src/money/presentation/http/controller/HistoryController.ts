import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiUseTags,
} from '@nestjs/swagger';
import { reverse, sortBy } from 'lodash';

import { Historian } from '&back/money/application/Historian';
import { IncomeRepository } from '&back/money/domain/IncomeRepository';
import { AbstractTransaction } from '&back/money/domain/interfaces/AbstarctTransaction';
import { OutcomeRepository } from '&back/money/domain/OutcomeRepository';
import { CurrentUser } from '&back/user/presentation/http/decorator/CurrentUser';
import { OnlyForUsers } from '&back/user/presentation/http/security/OnlyForUsers';
import { DateRange } from '&back/utils/infrastructure/dto/DateRange';
import { ApiQueryDateRange } from '&back/utils/presentation/http/api/ApiQueryDateRange';
import { createEnumValidationPipe } from '&back/utils/presentation/http/pipes/acceptable/createEnumValidationPipe';
import { ParseDateRangePipe } from '&back/utils/presentation/http/pipes/dateRange/ParseDateRangePipe';
import { GroupBy } from '&shared/enum/GroupBy';
import { TokenPayloadModel } from '&shared/models/user/TokenPayloadModel';

import { HistoryGroupResponse } from '../response/HistoryGroupResponse';

@Controller('money/history')
@OnlyForUsers()
@ApiUseTags('money')
@ApiBearerAuth()
export class HistoryController {
  public constructor(
    private readonly historian: Historian,
    private readonly outcomeRepo: OutcomeRepository,
    private readonly incomeRepo: IncomeRepository,
  ) {}

  @Get('grouped')
  @ApiOperation({ title: 'Fetch grouped history' })
  @ApiOkResponse({
    description: 'Fetching history success',
    type: HistoryGroupResponse,
    isArray: true,
  })
  @ApiQueryDateRange()
  public async showGrouped(
    @Query(ParseDateRangePipe) range: DateRange,
    @Query('by', createEnumValidationPipe(GroupBy)) by: GroupBy,
    @CurrentUser() { login }: TokenPayloadModel,
  ): Promise<HistoryGroupResponse[]> {
    const history = await this.historian.showGroupedHistory(login, range, by);

    const sorter = (transaction: AbstractTransaction) =>
      -transaction.date.valueOf();

    return reverse(
      history.map(({ title, incomes, outcomes }) =>
        HistoryGroupResponse.fromPair(
          title,
          sortBy(incomes, income => sorter(income)),
          sortBy(outcomes, outcome => sorter(outcome)),
        ),
      ),
    );
  }

  @Get('earliest')
  @ApiOperation({ title: 'Fetch date of the earliest transaction' })
  @ApiOkResponse({
    description: 'Fetching date success',
    type: Date,
  })
  public async showEarliestTransactionDate(
    @CurrentUser()
    user: TokenPayloadModel,
  ): Promise<Date> {
    return this.historian.getDateOfEarliestTransaction(user.login);
  }

  @Get('all-categories')
  @ApiOperation({ title: 'Fetch list of categories' })
  @ApiOkResponse({
    description: 'Fetching list success',
    type: String,
    isArray: true,
  })
  public async showAllCategories(
    @CurrentUser() user: TokenPayloadModel,
  ): Promise<string[]> {
    return this.outcomeRepo.findCategoriesForUser(user.login);
  }

  @Get('all-sources')
  @ApiOperation({ title: 'Fetch list of sources' })
  @ApiOkResponse({
    description: 'Fetching list success',
    type: String,
    isArray: true,
  })
  public async showAllSources(
    @CurrentUser() user: TokenPayloadModel,
  ): Promise<string[]> {
    return this.incomeRepo.findSourcesForUser(user.login);
  }
}
