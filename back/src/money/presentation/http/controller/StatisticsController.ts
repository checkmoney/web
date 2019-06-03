import { Controller, Get, Query } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiUseTags,
} from '@nestjs/swagger'

import { Statistician } from '$back/money/application/Statistician'
import { TokenPayloadModel } from '$shared/models/user/TokenPayloadModel'
import { CurrentUser } from '$back/user/presentation/http/decorator/CurrentUser'
import { OnlyForUsers } from '$back/user/presentation/http/security/OnlyForUsers'
import { DateRange } from '$back/utils/infrastructure/dto/DateRange'
import { ApiQueryDateRange } from '$back/utils/presentation/http/api/ApiQueryDateRange'
import { createEnumValidationPipe } from '$back/utils/presentation/http/pipes/acceptable/createEnumValidationPipe'
import { ParseDateRangePipe } from '$back/utils/presentation/http/pipes/dateRange/ParseDateRangePipe'
import { Currency } from '$shared/enum/Currency'
import { GroupBy } from '$shared/enum/GroupBy'

import { CategoryGroupOutcomeResponse } from '../response/CategoryGroupOutcomeResponse'
import { DateGroupResponse } from '../response/DateGroupResponse'
import { SourceGroupIncomeResponse } from '../response/SourceGroupIncomeResponse'
import { AverageAmountResponse } from '../response/AverageAmountResponse'

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
  public async showDateRangeStats(
    @Query(ParseDateRangePipe) range: DateRange,
    @Query('by', createEnumValidationPipe(GroupBy)) by: GroupBy = GroupBy.Month,
    @Query('currency', createEnumValidationPipe(Currency))
    currency: Currency = Currency.USD,
    @CurrentUser() { login }: TokenPayloadModel,
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
    @Query('currency', createEnumValidationPipe(Currency))
    currency: Currency = Currency.USD,
    @CurrentUser() { login }: TokenPayloadModel,
  ): Promise<SourceGroupIncomeResponse[]> {
    const sources = await this.statistician.showSources(login, range, currency)

    return sources
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
    @Query('currency', createEnumValidationPipe(Currency))
    currency: Currency = Currency.USD,
    @CurrentUser() { login }: TokenPayloadModel,
  ): Promise<CategoryGroupOutcomeResponse[]> {
    const categories = await this.statistician.showCategories(
      login,
      range,
      currency,
    )

    return categories
  }

  @Get('average')
  @ApiOperation({ title: 'Show average amounts' })
  @ApiOkResponse({
    description: 'Fetching stats success',
    type: AverageAmountResponse,
    isArray: true,
  })
  public async showAverage(
    @Query('by', createEnumValidationPipe(GroupBy)) by: GroupBy,
    @Query('currency', createEnumValidationPipe(Currency))
    currency: Currency = Currency.USD,
    @CurrentUser() { login }: TokenPayloadModel,
  ): Promise<AverageAmountResponse[]> {
    const averages = await this.statistician.showAverage(login, by, currency)

    return averages
  }
}
