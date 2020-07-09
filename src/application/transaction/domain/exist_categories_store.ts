import { createStore, attach, createEvent, forward, merge } from 'effector';
import { uniq } from 'lodash';

import { requestFx, Method } from '&front/application/api';

import { expenseCreated, earningCreated } from './transactions';

interface CategoriesState {
  expenses: string[];
  earnings: string[];
}

const fetchExistCategoriesForExpenses = attach({
  effect: requestFx,
  mapParams: () => ({
    path: '/money/history/all-categories',
    method: Method.Get,
  }),
});

const fetchExistCategoriesForEarnings = attach({
  effect: requestFx,
  mapParams: () => ({
    path: '/money/history/all-sources',
    method: Method.Get,
  }),
});

const existCategoriesRequested = createEvent();
forward({
  from: existCategoriesRequested,
  to: [fetchExistCategoriesForExpenses, fetchExistCategoriesForEarnings],
});

const $existCategories = createStore<CategoriesState>({
  expenses: [],
  earnings: [],
})
  .on(fetchExistCategoriesForExpenses.doneData, (state, { data }) => ({
    ...state,
    expenses: data,
  }))
  .on(fetchExistCategoriesForEarnings.doneData, (state, { data }) => ({
    ...state,
    earnings: data,
  }))
  .on(earningCreated, (state, item) => ({
    ...state,
    earnings: uniq([...state.earnings, item.source]),
  }))
  .on(expenseCreated, (state, item) => ({
    ...state,
    expenses: uniq([...state.expenses, item.category]),
  }));

export { $existCategories, existCategoriesRequested };
