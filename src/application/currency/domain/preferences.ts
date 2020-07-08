import { createStore, attach, forward } from 'effector';
import { AxiosResponse } from 'axios';

import { requestFx, Method } from '&front/application/api';

import { Currency } from './data';

const fetchUserCurrencyFx = attach<void, typeof requestFx>({
  effect: requestFx,
  mapParams: () => ({
    path: '/det-bell/v1/default-currency',
    method: Method.Get,
  }),
});

const setUserCurrencyFx = attach({
  effect: requestFx,
  mapParams: (currency: Currency) => ({
    path: `/user/profile/set-currency/${currency}`,
    method: Method.Post,
  }),
});

/**
 * Refetch currency after setting
 */
forward({
  from: setUserCurrencyFx.done,
  to: fetchUserCurrencyFx,
});

const $currency = createStore<Currency | null>(null).on(
  fetchUserCurrencyFx.doneData,
  (_, { data }: AxiosResponse<Currency>) => data,
);

export { $currency, fetchUserCurrencyFx, setUserCurrencyFx };
