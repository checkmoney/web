import {
  DetBell,
  DrKhomyuk,
  PeriodType,
  DateRange,
} from '@checkmoney/soap-opera';
import {
  startOfWeek,
  subWeeks,
  endOfWeek,
  subMonths,
  startOfMonth,
  endOfMonth,
} from 'date-fns';
import * as md5 from 'md5';

import { Adviser } from '&back/mind/infrastructure/adviser/helpers/Adviser';
import { IsAdviser } from '&back/mind/infrastructure/adviser/helpers/IsAdviser';
import { UserRepository } from '&back/user/domain/UserRepository';
import { Currency } from '&shared/enum/Currency';
import { GroupBy } from '&shared/enum/GroupBy';
import { TipAction } from '&shared/enum/TipAction';
import { formatDate } from '&shared/helpers/formatDate';
import { TipModel } from '&shared/models/mind/TipModel';

@IsAdviser()
export class PastDaysBudgetAdviser implements Adviser {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly users: DetBell,
    private readonly stats: DrKhomyuk,
  ) {}

  public async giveAdvice(login: string): Promise<TipModel[]> {
    const [currency, token] = await Promise.all([
      this.userRepo.getDefaultCurrency(login),
      this.users.pretend(login),
    ]);

    return Promise.all([
      this.giveAdviceForLastWeek(login, token, currency),
      this.giceAdviceForLastMonth(token, currency),
    ]);
  }

  private async giceAdviceForLastMonth(token: string, currency: Currency) {
    const now = new Date();
    const nowMinusMonth = subMonths(now, 1);

    const from = startOfMonth(nowMinusMonth);
    const to = endOfMonth(nowMinusMonth);

    const [lastMonthStats] = await this.stats.fetchAmount(
      token,
      PeriodType.Month,
      new DateRange(from, to),
    );

    return {
      token: this.createToken(from, to, GroupBy.Month),
      date: now,
      action: TipAction.PastDaysBudget,
      meta: {
        outcome: Number(lastMonthStats.expenses),
        currency,
        group: GroupBy.Month,
      },
    };
  }

  private async giveAdviceForLastWeek(
    login: string,
    token: string,
    currency: Currency,
  ): Promise<TipModel> {
    const weekStartsOn = await this.userRepo.getWeekStartsOn(login);

    const now = new Date();
    const nowMinusWeek = subWeeks(now, 1);

    const from = startOfWeek(nowMinusWeek, { weekStartsOn });
    const to = endOfWeek(nowMinusWeek, { weekStartsOn });

    const [lastWeekStats] = await this.stats.fetchAmount(
      token,
      PeriodType.Week,
      new DateRange(from, to),
    );

    return {
      token: this.createToken(from, to, GroupBy.Week),
      date: now,
      action: TipAction.PastDaysBudget,
      meta: {
        outcome: Number(lastWeekStats.expenses),
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
