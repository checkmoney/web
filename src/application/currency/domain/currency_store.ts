import { createStore, attach } from 'effector';
import { AxiosResponse } from 'axios';

import { requestFx, Method } from '&front/application/api';

import { Currency } from './currency';

const fetchUserCurrencyFx = attach<void, typeof requestFx>({
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
setCurrencyFx.done.watch(() => fetchUserCurrencyFx());

const $currency = createStore<Currency | null>(null).on(
  fetchUserCurrencyFx.doneData,
  (_, { data }: AxiosResponse<Currency>) => data,
);

export { $currency, fetchUserCurrencyFx, setCurrencyFx };
