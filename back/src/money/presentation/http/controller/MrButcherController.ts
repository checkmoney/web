import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiImplicitBody } from '@nestjs/swagger';

import { IncomeRepository } from '&back/money/domain/IncomeRepository';
import { OutcomeRepository } from '&back/money/domain/OutcomeRepository';
import { CurrentUser } from '&back/user/presentation/http/decorator/CurrentUser';
import { OnlyForUsers } from '&back/user/presentation/http/security/OnlyForUsers';
import { TokenPayloadModel } from '&shared/models/user/TokenPayloadModel';

@Controller('mr-butcher/v1/transactions')
@OnlyForUsers()
@ApiBearerAuth()
export class MrButcherController {
  public constructor(
    private readonly outcomeRepo: OutcomeRepository,
    private readonly incomeRepo: IncomeRepository,
  ) {}

  @Post('fetch-batch')
  @ApiImplicitBody({ name: 'ids', type: String, isArray: true })
  public async fetchTransactionsByIds(
    @Body('ids') ids: string[],
    @CurrentUser() { login }: TokenPayloadModel,
  ) {
    const [incomes, outcomes] = await Promise.all([
      this.incomeRepo.fetchByIdsForUser(ids, login),
      this.outcomeRepo.fetchByIdsForUser(ids, login),
    ]);

    const transactions = [
      ...incomes.map(income => ({
        ...income,
        category: income.source,
        amount: `${income.amount}`,
      })),
      ...outcomes.map(outcome => ({
        ...outcome,
        amount: `${-outcome.amount}`,
      })),
    ];

    return transactions;
  }

  @Get('ids')
  public async fetchTransactionIds(
    @Query('offset') offsetQuery: string,
    @Query('limit') limitQuery: string,
    @CurrentUser()
    { login }: TokenPayloadModel,
  ) {
    const limit = parseInt(limitQuery, 10);
    const offset = parseInt(offsetQuery, 10);

    const [totalIncomeCount, totalOutcomeCount] = await Promise.all([
      this.incomeRepo.getTotalCountForUser(login),
      this.outcomeRepo.getTotalCountForUser(login),
    ]);

    const incomeIds = await this.incomeRepo.fetchIds(login, offset, limit);

    let outcomeIds = [];
    if (incomeIds.length !== limit) {
      let outcomeOffset: number;
      if (offset > totalIncomeCount) {
        outcomeOffset = offset - totalIncomeCount;
      } else {
        outcomeOffset = 0;
      }
      const outcomeLimit = limit - incomeIds.length;
      outcomeIds = await this.outcomeRepo.fetchIds(
        login,
        outcomeOffset,
        outcomeLimit,
      );
    }

    return {
      total: totalIncomeCount + totalOutcomeCount,
      items: [...incomeIds, ...outcomeIds],
    };
  }
}
