import { Controller, Get, Query } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiImplicitQuery,
  ApiOkResponse,
  ApiOperation,
  ApiUseTags,
} from '@nestjs/swagger'

import { Statistician } from '@back/money/application/Statistician'
import { TokenPayload } from '@back/user/application/dto/TokenPayload'
import { CurrentUser } from '@back/user/presentation/http/decorator/CurrentUser'
import { OnlyForUsers } from '@back/user/presentation/http/security/OnlyForUsers'
import { DateRange } from '@back/utils/infrastructure/dto/DateRange'
import { ApiQueryDateRange } from '@back/utils/presentation/http/api/ApiQueryDateRange'
import { createEnumValidationPipe } from '@back/utils/presentation/http/pipes/acceptable/createEnumValidationPipe'
import { ParseDateRangePipe } from '@back/utils/presentation/http/pipes/dateRange/ParseDateRangePipe'
import { Currency } from '@shared/enum/Currency'
import { GroupBy } from '@shared/enum/GroupBy'

import { CategoryGroupOutcomeResponse } from '../response/CategoryGroupOutcomeResponse'
import { DateGroupResponse } from '../response/DateGroupResponse'
import { SourceGroupIncomeResponse } from '../response/SourceGroupIncomeResponse'

@Controller('money/statistics')
@OnlyForUsers()
@ApiUseTags('money')
@ApiBearerAuth()
export class StatisticsController {
  public constructor(private readonly statistician: Statistician) {}

  @Get('date-range')
  @ApiOperation({ title: 'Show date range statistics' })
  @ApiOkResponse({
    description: 'Fetching stats sucess',
    type: DateGroupResponse,
    isArray: true,
  })
  @ApiQueryDateRange()
  @ApiImplicitQuery({ name: 'currency' })
  public async showDateRangeStats(
    @Query(ParseDateRangePipe) range: DateRange,
    @Query('by', createEnumValidationPipe(GroupBy)) by: GroupBy = GroupBy.Month,
    @Query('currency', createEnumValidationPipe(Currency))
    currency = Currency.USD,
    @CurrentUser() { login }: TokenPayload,
  ): Promise<DateGroupResponse[]> {
    const stats = await this.statistician.showDateRangeStats(
      login,
      range,
      by,
      currency,
    )

    return stats
  }

  @Get('income-sources')
  @ApiOperation({ title: 'Show income sources' })
  @ApiOkResponse({
    description: 'Fetching stats sucess',
    type: SourceGroupIncomeResponse,
    isArray: true,
  })
  @ApiQueryDateRange()
  public async showIncomeSourcesStats(
    @Query(ParseDateRangePipe) range: DateRange,
  ): Promise<SourceGroupIncomeResponse[]> {
    throw Error('Not implemented')
  }

  @Get('outcome-categories')
  @ApiOperation({ title: 'Show outcome categories' })
  @ApiOkResponse({
    description: 'Fetching stats sucess',
    type: CategoryGroupOutcomeResponse,
    isArray: true,
  })
  @ApiQueryDateRange()
  public async showOutcomeCategoriesStats(
    @Query(ParseDateRangePipe) range: DateRange,
  ): Promise<CategoryGroupOutcomeResponse[]> {
    throw Error('Not implemented')
  }
}
