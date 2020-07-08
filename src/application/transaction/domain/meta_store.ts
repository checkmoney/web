import { createStore, attach } from 'effector';

import { requestFx, Method } from '&front/application/api';

const fetchFirstTransactionDateFx = attach({
  effect: requestFx,
  mapParams: () => ({
    path: '/money/history/earliest',
    method: Method.Get,
    targetClass: Date,
  }),
});

// TODO: listen NewTransactionCreated and check new first transaction date

const $transactionsMeta = createStore({
  firstTransactionDate: new Date(),
}).on(fetchFirstTransactionDateFx.doneData, (state, { data }) => ({
  ...state,
  firstTransactionDate: data,
}));

export { $transactionsMeta, fetchFirstTransactionDateFx };
