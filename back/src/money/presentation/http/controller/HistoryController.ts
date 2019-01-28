import { Controller, Get, Query } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiImplicitQuery,
  ApiOkResponse,
  ApiOperation,
  ApiUseTags,
} from '@nestjs/swagger'

import { DateRange } from '@back/utils/infrastructure/dto/DateRange'
import { ApiQueryDateRange } from '@back/utils/presentation/http/api/ApiQueryDateRange'
import { ParseDateRangePipe } from '@back/utils/presentation/http/pipes/dateRange/ParseDateRangePipe'
import { GroupBy } from '@shared/enum/GroupBy'

import { HistoryGroupResponse } from '../response/HistoryGroupResponse'

@Controller('money/history')
@ApiUseTags('money')
@ApiBearerAuth()
export class HistoryController {
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
    @Query('by') by: GroupBy,
  ): Promise<HistoryGroupResponse[]> {
    return []
  }
}
