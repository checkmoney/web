import { createStore, attach, createEvent, forward } from 'effector';

import { requestFx, Method } from '&front/application/api';

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

// TODO: Listen newTransactionCreated and add category to this store

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
  }));

export { $existCategories, existCategoriesRequested };
