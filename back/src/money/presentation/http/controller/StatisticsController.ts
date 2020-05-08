import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiUseTags,
} from '@nestjs/swagger';

import { Statistician } from '&back/money/application/Statistician';
import { CurrentUser } from '&back/user/presentation/http/decorator/CurrentUser';
import { OnlyForUsers } from '&back/user/presentation/http/security/OnlyForUsers';
import { DateRange } from '&back/utils/infrastructure/dto/DateRange';
import { ApiQueryDateRange } from '&back/utils/presentation/http/api/ApiQueryDateRange';
import { createEnumValidationPipe } from '&back/utils/presentation/http/pipes/acceptable/createEnumValidationPipe';
import { ParseDateRangePipe } from '&back/utils/presentation/http/pipes/dateRange/ParseDateRangePipe';
import { Currency } from '&shared/enum/Currency';
import { GroupBy } from '&shared/enum/GroupBy';
import { TokenPayloadModel } from '&shared/models/user/TokenPayloadModel';

import { DateGroupResponse } from '../response/DateGroupResponse';

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
    );

    return stats;
  }
}
