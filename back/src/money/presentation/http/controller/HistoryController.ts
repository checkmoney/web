import { Controller, Get, Query } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiImplicitQuery,
  ApiOkResponse,
  ApiOperation,
  ApiUseTags,
} from '@nestjs/swagger'

import { GroupBy } from '@shared/enum/GroupBy'

import { ParseDatePipe } from '@back/utils/http/ParseDatePipe'

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
  @ApiImplicitQuery({ name: 'by', required: false })
  public async showGrouped(
    @Query('from', ParseDatePipe) from: Date,
    @Query('to', ParseDatePipe) to: Date,
    @Query('by') by: GroupBy = GroupBy.Month,
  ): Promise<HistoryGroupResponse[]> {
    return []
  }
}
