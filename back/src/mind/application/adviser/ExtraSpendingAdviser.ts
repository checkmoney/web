import {
  DrKhomyuk,
  DetBell,
  PeriodType,
  DateRange,
} from '@checkmoney/soap-opera';
import {
  startOfMonth,
  subMonths,
  endOfMonth,
  getYear,
  getMonth,
} from 'date-fns';
import * as md5 from 'md5';

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
    private readonly userRepo: UserRepository,
    private readonly users: DetBell,
    private readonly stats: DrKhomyuk,
  ) {}

  public async giveAdvice(userLogin: string): Promise<TipModel[]> {
    const monthProgress = calculateGroupProgress(GroupBy.Month);
    const [currency, token] = await Promise.all([
      this.userRepo.getDefaultCurrency(userLogin),
      this.users.pretend(userLogin),
    ]);

    const now = new Date();

    const [lastMonthStats, currentMonthStats] = await this.stats.fetchAmount(
      token,
      PeriodType.Month,
      new DateRange(startOfMonth(subMonths(now, 1)), endOfMonth(now)),
    );

    const income = Number(lastMonthStats.earnings) * monthProgress;
    const outcome = Number(currentMonthStats.expenses);

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
