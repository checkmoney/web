import { attach, createEvent, forward } from 'effector';
import { some } from 'patronum';

import { requestFx, Method } from '&front/application/api';

import { Earning, Expense } from '../types/transaction';

const expenseCreated = createEvent<Expense>();
const earningCreated = createEvent<Earning>();
const transactionCreated = createEvent<Expense | Earning>();
const transactionDeleted = createEvent<string>();

forward({
  from: expenseCreated,
  to: transactionCreated,
});
forward({
  from: earningCreated,
  to: transactionCreated,
});

const createEarningFx = attach({
  effect: requestFx,
  mapParams: (data: Earning) => ({
    method: Method.Post,
    path: '/money/transaction/income',
    body: data,
  }),
});
forward({
  from: createEarningFx.done.map(({ params }) => params),
  to: earningCreated,
});

const createExpenseFx = attach({
  effect: requestFx,
  mapParams: (data: Expense) => ({
    method: Method.Post,
    path: '/money/transaction/outcome',
    body: data,
  }),
});
forward({
  from: createExpenseFx.done.map(({ params }) => params),
  to: expenseCreated,
});

const $creationStatus = some(true, [
  createEarningFx.pending,
  createExpenseFx.pending,
]).map((inProgress) => ({ inProgress }));

const deleteTransactionFx = attach({
  effect: requestFx,
  mapParams: (id: string) => ({
    method: Method.Delete,
    path: `/money/transaction/${id}`,
  }),
});
forward({
  from: deleteTransactionFx.done.map(({ params }) => params),
  to: transactionDeleted,
});

export {
  createEarningFx,
  createExpenseFx,
  deleteTransactionFx,
  $creationStatus,
  expenseCreated,
  earningCreated,
  transactionDeleted,
  transactionCreated,
};
