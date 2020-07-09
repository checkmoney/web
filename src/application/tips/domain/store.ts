import { createStore, attach, createEvent, forward, merge } from 'effector';

import { requestFx, Method } from '&front/application/api';
import {
  transactionCreated,
  transactionDeleted,
} from '&front/application/transaction';

import { TipModel } from '../types/tip';

const tipHidden = createEvent<string>();

const fetchTipsFx = attach({
  effect: requestFx,
  mapParams: () => ({
    method: Method.Get,
    targetClass: TipModel,
    path: '/mind/tip',
  }),
});

const disableTipFx = attach({
  effect: requestFx,
  mapParams: (token: string) => ({
    method: Method.Post,
    path: '/mind/tip/disable',
    body: { tokens: [token] },
  }),
});

// Before start disabling, hide tip from UI
forward({
  from: disableTipFx,
  to: tipHidden,
});

// After disabling done, refetch tips
forward({
  from: disableTipFx.done,
  to: fetchTipsFx,
});

// When new transaction created or deleted
// refetch tip
forward({
  from: merge([transactionCreated, transactionDeleted]),
  to: fetchTipsFx,
});

const $tips = createStore<TipModel[]>([])
  .on(fetchTipsFx.doneData, (_, { data }) => data)
  .on(tipHidden, (state, disabledToken) =>
    state.filter((tip) => tip.token !== disabledToken),
  );

export { $tips, fetchTipsFx, disableTipFx, tipHidden };
