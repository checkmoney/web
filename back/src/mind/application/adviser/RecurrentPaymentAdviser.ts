import {
  startOfMonth,
  subMonths,
  getDate,
  endOfMonth,
  subDays,
  addDays,
  getDaysInMonth,
  lastDayOfMonth,
} from 'date-fns';
import { last, dropRight } from 'lodash';
import * as md5 from 'md5';

import { Historian } from '&back/money/application/Historian';
import { Outcome } from '&back/money/domain/Outcome.entity';
import { GroupBy } from '&shared/enum/GroupBy';
import { TipAction } from '&shared/enum/TipAction';
import { TipModel } from '&shared/models/mind/TipModel';

import { Adviser } from '../../infrastructure/adviser/helpers/Adviser';
import { IsAdviser } from '../../infrastructure/adviser/helpers/IsAdviser';
import { findRecurrentTransactions } from '../calculator/findRecurrentTransactions';
import { groupHasSameTransaction } from '../calculator/helpers/groupHasSameTransaction';

const MONTH_FOR_RETROSPECTIVE = 3;
const DAYS_GAP = 5;

@IsAdviser()
export class RecurrentPaymentAdviser implements Adviser {
  public constructor(private readonly historian: Historian) {}

  public async giveAdvice(userLogin: string): Promise<TipModel[]> {
    const { thisMonth, previousMonths } = await this.getMonthsHistory(
      userLogin,
    );

    const recurrentTransactions = findRecurrentTransactions(
      previousMonths,
      DAYS_GAP,
    ).filter(
      transaction => !groupHasSameTransaction(thisMonth, transaction, DAYS_GAP),
    );

    const now = new Date();

    return recurrentTransactions.map(outcome => ({
      token: this.createToken(outcome),
      date: now,
      action: TipAction.RecurrentPayment,
      meta: {
        ...outcome,
        period: this.getPeriod(outcome.date),
      },
    }));
  }

  private async getMonthsHistory(userLogin: string) {
    const now = new Date();

    const from = startOfMonth(subMonths(now, MONTH_FOR_RETROSPECTIVE));
    const to = endOfMonth(now);

    const history = await this.historian.showGroupedHistory(
      userLogin,
      { from, to },
      GroupBy.Month,
    );

    const transactions = history.map(({ outcomes }) => outcomes);

    return {
      thisMonth: last(transactions),
      previousMonths: dropRight(transactions, 1),
    };
  }

  private getPeriod = (date: Date) => {
    const start = getDate(subDays(date, DAYS_GAP / 2));
    const end = getDate(addDays(date, DAYS_GAP / 2));

    const startValid = start >= 1;
    const endValid = end <= getDaysInMonth(date);

    return {
      from: startValid ? start : 1,
      to: endValid ? end : getDate(lastDayOfMonth(date)),
    };
  };

  private createToken({ category, amount, currency }: Outcome): string {
    const payload = {
      category,
      amount,
      currency,
      action: TipAction.RecurrentPayment,
    };

    return md5(JSON.stringify(payload));
  }
}
