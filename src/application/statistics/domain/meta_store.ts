import { createStore, createEvent } from 'effector';

import { Currency } from '&front/application/profile';
import { requestFx } from '&front/application/api';

interface MetaStore {
  currency?: Currency;
}

const newCurrencyRecieved = createEvent<Currency>();

const $statisticsMeta = createStore<MetaStore>({}).on(
  newCurrencyRecieved,
  (state, currency) => ({ ...state, currency }),
);

requestFx.doneData.watch(({ headers }) => {
  const currency = headers['checkmoney-currency'];

  if (currency) {
    newCurrencyRecieved(currency);
  }
});

export { $statisticsMeta };
