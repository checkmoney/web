import { createStore, attach } from 'effector';
import { Type } from 'class-transformer';
import { flatMap, sortBy, take, last } from 'lodash';
import { isWithinRange, isAfter } from 'date-fns';

import { requestFx, Method } from '&front/application/api';
import { DateRange, PeriodType } from '&front/shared';

import { Expense, Earning } from '../types/transaction';
import {
  earningCreated,
  expenseCreated,
  transactionDeleted,
} from './transactions';

class HistoryGroup {
  title: string;

  @Type(() => Earning)
  incomes: Earning[];

  @Type(() => Expense)
  outcomes: Expense[];
}

const fetchHistoryFx = attach({
  effect: requestFx,
  mapParams: (dateRage: DateRange) => ({
    method: Method.Get,
    path: '/money/history/grouped',
    query: {
      from: dateRage.start,
      to: dateRage.end,
      by: PeriodType.Year,
    },
    targetClass: HistoryGroup,
  }),
});

interface History {
  expenses: Expense[];
  earnings: Earning[];
}

const $internalHistory = createStore<History>({
  earnings: [],
  expenses: [],
})
  .on(fetchHistoryFx.done, (state, { params, result: { data } }) => {
    const fetchedGroups: HistoryGroup[] = data;

    const filterOldItems = (item: Earning | Expense) =>
      item.date && !isWithinRange(item.date, params.start, params.end);

    return {
      earnings: [
        ...state.earnings.filter(filterOldItems),
        ...flatMap(fetchedGroups, (group) => group.incomes),
      ],
      expenses: [
        ...state.expenses.filter(filterOldItems),
        ...flatMap(fetchedGroups, (group) => group.outcomes),
      ],
    };
  })
  .on(earningCreated, (state, item) => ({
    ...state,
    earnings: [...state.earnings, item],
  }))
  .on(expenseCreated, (state, item) => ({
    ...state,
    expenses: [...state.expenses, item],
  }))
  .on(transactionDeleted, (state, deletedId) => ({
    earnings: state.earnings.filter(({ id }) => id !== deletedId),
    expenses: state.expenses.filter(({ id }) => id !== deletedId),
  }));

const $history = $internalHistory.map((state) => {
  const byDate = (item: Earning & Expense) => -(item.date?.valueOf() ?? 0);

  return {
    earnings: sortBy(state.earnings, byDate),
    expenses: sortBy(state.expenses, byDate),
  };
});

const SHORT_HISTORY_MAX_LENGTH = 10;

const $shortHistory = $history.map((state) => {
  const lastDate =
    last(
      take(
        sortBy(
          [
            ...state.earnings.map((item) => item.date),
            ...state.expenses.map((item) => item.date),
          ],
          (date) => -(date?.valueOf() ?? 0),
        ),
        SHORT_HISTORY_MAX_LENGTH,
      ),
    ) ?? new Date();

  const filterAfterLastDate = (item: Expense | Earning) =>
    item.date && isAfter(item.date, lastDate);

  return {
    earnings: state.earnings.filter(filterAfterLastDate),
    expenses: state.expenses.filter(filterAfterLastDate),
  };
});

const $historyStatus = createStore({ isLoading: true }).on(
  fetchHistoryFx.done,
  (state) => ({ ...state, isLoading: false }),
);

const selectHistoryForDateRange = (
  state: History,
  [dateRange]: [DateRange],
) => {
  const filterItemInRange = (item: Expense | Earning) =>
    item.date && isWithinRange(item.date, dateRange.start, dateRange.end);

  return {
    expenses: state.expenses.filter(filterItemInRange),
    earnings: state.earnings.filter(filterItemInRange),
  };
};

export {
  $history,
  $shortHistory,
  SHORT_HISTORY_MAX_LENGTH,
  fetchHistoryFx,
  $historyStatus,
  selectHistoryForDateRange,
};
