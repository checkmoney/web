import {
  startOfMonth,
  subMonths,
  endOfMonth,
  getYear,
  getMonth,
} from 'date-fns';
import * as md5 from 'md5';

import { Statistician } from '&back/money/application/Statistician';
import { UserRepository } from '&back/user/domain/UserRepository';
import { GroupBy } from '&shared/enum/GroupBy';
import { TipAction } from '&shared/enum/TipAction';
import { calculateGroupProgress } from '&shared/helpers/calculateGroupProgress';
import { TipModel } from '&shared/models/mind/TipModel';

import { Adviser } from '../../infrastructure/adviser/helpers/Adviser';
import { IsAdviser } from '../../infrastructure/adviser/helpers/IsAdviser';

@IsAdviser()
export class ExtraSpendingAdviser implements Adviser {
  public constructor(
    private readonly statistician: Statistician,
    private readonly userRepo: UserRepository,
  ) {}

  public async giveAdvice(userLogin: string): Promise<TipModel[]> {
    const monthProgress = calculateGroupProgress(GroupBy.Month);
    const currency = await this.userRepo.getDefaultCurrency(userLogin);

    const now = new Date();
    const dateRange = {
      from: startOfMonth(subMonths(now, 1)),
      to: endOfMonth(now),
    };
    const [
      lastMonthStats,
      currentMonthStats,
    ] = await this.statistician.showDateRangeStats(
      userLogin,
      dateRange,
      GroupBy.Month,
      currency,
    );

    const income = lastMonthStats.income * monthProgress;
    const { outcome } = currentMonthStats;

    if (outcome <= income) {
      return [];
    }

    return [
      {
        token: this.createToken(now, TipAction.ExtraSpending),
        date: now,
        action: TipAction.ExtraSpending,
        meta: {
          difference: outcome - income,
          currency,
        },
      },
    ];
  }

  private createToken(date: Date, action: TipAction): string {
    const payload = {
      variant: `${getYear(date)}-${getMonth(date)}`,
      action,
    };

    return md5(JSON.stringify(payload));
  }
}
