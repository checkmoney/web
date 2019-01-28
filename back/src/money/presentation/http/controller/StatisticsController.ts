import { Controller, Get, Query } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiUseTags,
} from '@nestjs/swagger'

import { DateRange } from '@back/utils/infrastructure/dto/DateRange'
import { ApiQueryDateRange } from '@back/utils/presentation/http/api/ApiQueryDateRange'
import { ParseDateRangePipe } from '@back/utils/presentation/http/pipes/dateRange/ParseDateRangePipe'
import { GroupBy } from '@shared/enum/GroupBy'

import { CategoryGroupOutcomeResponse } from '../response/CategoryGroupOutcomeResponse'
import { DateGroupResponse } from '../response/DateGroupResponse'
import { SourceGroupIncomeResponse } from '../response/SourceGroupIncomeResponse'

@Controller('money/statistics')
@ApiUseTags('money')
@ApiBearerAuth()
export class StatisticsController {
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
    @Query('by') by: GroupBy = GroupBy.Month,
  ): Promise<DateGroupResponse[]> {
    return []
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
    return []
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
    return []
  }
}
