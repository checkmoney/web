import { Controller, Get, Query } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiImplicitQuery,
  ApiOkResponse,
  ApiOperation,
  ApiUseTags,
} from '@nestjs/swagger'

import { Historian } from '@back/money/application/Historian'
import { TokenPayload } from '@back/user/application/dto/TokenPayload'
import { CurrentUser } from '@back/user/presentation/http/decorator/CurrentUser'
import { OnlyForUsers } from '@back/user/presentation/http/security/OnlyForUsers'
import { DateRange } from '@back/utils/infrastructure/dto/DateRange'
import { ApiQueryDateRange } from '@back/utils/presentation/http/api/ApiQueryDateRange'
import { createEnumValidationPipe } from '@back/utils/presentation/http/pipes/acceptable/createEnumValidationPipe'
import { ParseDateRangePipe } from '@back/utils/presentation/http/pipes/dateRange/ParseDateRangePipe'
import { GroupBy } from '@shared/enum/GroupBy'

import { HistoryGroupResponse } from '../response/HistoryGroupResponse'

@Controller('money/history')
@OnlyForUsers()
@ApiUseTags('money')
@ApiBearerAuth()
export class HistoryController {
  public constructor(private readonly historian: Historian) {}

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
    @CurrentUser() { login }: TokenPayload,
  ): Promise<HistoryGroupResponse[]> {
    const history = await this.historian.showGroupedHistory(login, range, by)

    return history.map(({ title, incomes, outcomes }) =>
      HistoryGroupResponse.fromPair(title, incomes, outcomes),
    )
  }

  @Get('earliest')
  @ApiOperation({ title: 'Fetch date of the earliest transaction' })
  @ApiOkResponse({
    description: 'Fetching date success',
    type: Date,
  })
  public async showEarliestTransactionDate(
    @CurrentUser()
    user: TokenPayload,
  ): Promise<Date> {
    return this.historian.getDateOfEarliestTransaction(user.login)
  }
}
