import * as md5 from 'md5';
import {
  startOfWeek,
  subWeeks,
  endOfWeek,
  subMonths,
  startOfMonth,
  endOfMonth,
} from 'date-fns';

import { Adviser } from '&back/mind/infrastructure/adviser/helpers/Adviser';
import { IsAdviser } from '&back/mind/infrastructure/adviser/helpers/IsAdviser';
import { TipModel } from '&shared/models/mind/TipModel';
import { Statistician } from '&back/money/application/Statistician';
import { UserRepository } from '&back/user/domain/UserRepository';
import { GroupBy } from '&shared/enum/GroupBy';
import { Currency } from '&shared/enum/Currency';
import { TipAction } from '&shared/enum/TipAction';
import { formatDate } from '&shared/helpers/formatDate';

@IsAdviser()
export class PastDaysBudgetAdviser implements Adviser {
  constructor(
    private readonly statistician: Statistician,
    private readonly userRepo: UserRepository,
  ) {}

  public async giveAdvice(login: string): Promise<TipModel[]> {
    const currency = await this.userRepo.getDefaultCurrency(login);

    return Promise.all([
      this.giveAdviceForLastWeek(login, currency),
      this.giceAdviceForLastMonth(login, currency),
    ]);
  }

  private async giceAdviceForLastMonth(login: string, currency: Currency) {
    const now = new Date();
    const nowMinusMonth = subMonths(now, 1);

    const from = startOfMonth(nowMinusMonth);
    const to = endOfMonth(nowMinusMonth);

    const [lastMonthStats] = await this.statistician.showDateRangeStats(
      login,
      { from, to },
      GroupBy.Month,
      currency,
    );

    return {
      token: this.createToken(from, to, GroupBy.Month),
      date: now,
      action: TipAction.PastDaysBudget,
      meta: {
        outcome: lastMonthStats.outcome,
        currency,
        group: GroupBy.Month,
      },
    };
  }

  private async giveAdviceForLastWeek(
    login: string,
    currency: Currency,
  ): Promise<TipModel> {
    const weekStartsOn = await this.userRepo.getWeekStartsOn(login);

    const now = new Date();
    const nowMinusWeek = subWeeks(now, 1);

    const from = startOfWeek(nowMinusWeek, { weekStartsOn });
    const to = endOfWeek(nowMinusWeek, { weekStartsOn });

    const [lastWeekStats] = await this.statistician.showDateRangeStats(
      login,
      { from, to },
      GroupBy.Week,
      currency,
    );

    return {
      token: this.createToken(from, to, GroupBy.Week),
      date: now,
      action: TipAction.PastDaysBudget,
      meta: {
        outcome: lastWeekStats.outcome,
        currency,
        group: GroupBy.Week,
      },
    };
  }

  private createToken(from: Date, to: Date, group: GroupBy) {
    const payload = {
      from: formatDate(from),
      to: formatDate(to),
      action: TipAction.PastDaysBudget,
      group,
    };

    return md5(JSON.stringify(payload));
  }
}
