import { createStore, attach } from 'effector';

import { requestFx, Method } from '&front/application/api';

import { Currency } from './currency/currency';

// TODO: add `force` param and stop refetching data if it available and non-force request
const getCurrencyFx = attach<void, typeof requestFx>({
  effect: requestFx,
  mapParams: () => ({
    path: '/det-bell/v1/default-currency',
    method: Method.Get,
  }),
});

const setCurrencyFx = attach({
  effect: requestFx,
  mapParams: (currency: Currency) => ({
    path: `/user/profile/set-currency/${currency}`,
    method: Method.Post,
  }),
});
setCurrencyFx.done.watch(() => getCurrencyFx());

interface CurrencyStore {
  data: Currency | null;
  isReady: boolean;
  error?: string;
}

const $currency = createStore<CurrencyStore>({
  data: null,
  isReady: false,
}).on(getCurrencyFx.doneData, (state, currency: Currency) => ({
  ...state,
  data: currency,
  isReady: true,
}));

export { $currency, getCurrencyFx, setCurrencyFx };
