import {
  DetBell,
  DrKhomyuk,
  PeriodType,
  DateRange,
} from '@checkmoney/soap-opera';
import { subMonths, startOfMonth, startOfDay, endOfDay } from 'date-fns';
import * as md5 from 'md5';

import { UserRepository } from '&back/user/domain/UserRepository';
import { Currency } from '&shared/enum/Currency';
import { TipAction } from '&shared/enum/TipAction';
import { formatDate } from '&shared/helpers/formatDate';
import { TipModel } from '&shared/models/mind/TipModel';

import { Adviser } from '../../infrastructure/adviser/helpers/Adviser';
import { IsAdviser } from '../../infrastructure/adviser/helpers/IsAdviser';
import { calculateBudget } from '../calculator/calculateBudget';

@IsAdviser()
export class BudgetAdviser implements Adviser {
  public constructor(
    private readonly userRepo: UserRepository,
    private readonly stats: DrKhomyuk,
    private readonly users: DetBell,
  ) {}

  public async giveAdvice(userLogin: string): Promise<TipModel[]> {
    const [currency, token] = await Promise.all([
      this.userRepo.getDefaultCurrency(userLogin),
      this.users.pretend(userLogin),
    ]);

    const [monthsStats, todaysStats] = await Promise.all([
      this.getMonthsStats(token, currency),
      this.getTodaysStats(token),
    ]);

    const money = {
      ...monthsStats,
      ...todaysStats,
    };

    const now = new Date();

    const amount = calculateBudget(money, now);

    return [
      {
        date: now,
        action: TipAction.DailyBudget,
        meta: { amount, currency },
        token: this.createToken(now, TipAction.DailyBudget),
      },
    ];
  }

  private async getTodaysStats(token: string) {
    const now = new Date();

    const [todaysStats] = await this.stats.fetchAmount(
      token,
      PeriodType.Day,
      new DateRange(startOfDay(now), endOfDay(now)),
    );

    return {
      todayOutcome: Number(todaysStats.expenses),
    };
  }

  private async getMonthsStats(token: string, currency: Currency) {
    const now = new Date();
    const startDate = startOfMonth(subMonths(now, 1));

    const [previousMonth, thisMonth] = await this.stats.fetchAmount(
      token,
      PeriodType.Month,
      new DateRange(startDate, now),
    );

    return {
      previousMonthIncome: Number(previousMonth.earnings),
      thisMonthOutcome: Number(thisMonth.expenses),
    };
  }

  private createToken(date: Date, action: TipAction): string {
    const payload = {
      variant: `${formatDate(date)}`,
      action,
    };

    return md5(JSON.stringify(payload));
  }
}
