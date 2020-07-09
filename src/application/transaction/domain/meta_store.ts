import { createStore, attach, createEvent, forward } from 'effector';
import { min } from 'date-fns';

import { requestFx, Method } from '&front/application/api';

import { earningCreated, expenseCreated } from './transactions';

const newTransactionDateReceived = createEvent<Date>();

const fetchFirstTransactionDateFx = attach({
  effect: requestFx,
  mapParams: () => ({
    path: '/money/history/earliest',
    method: Method.Get,
    targetClass: Date,
  }),
});
forward({
  from: fetchFirstTransactionDateFx.doneData.map(({ data }) => data),
  to: newTransactionDateReceived,
});

forward({
  from: earningCreated.filterMap((item) => item.date),
  to: newTransactionDateReceived,
});
forward({
  from: expenseCreated.filterMap((item) => item.date),
  to: newTransactionDateReceived,
});

const $transactionsMeta = createStore({
  firstTransactionDate: new Date(),
}).on(newTransactionDateReceived, (state, date) => ({
  ...state,
  firstTransactionDate: min(state.firstTransactionDate, date),
}));

export { $transactionsMeta, fetchFirstTransactionDateFx };
