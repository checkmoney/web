import { createStore, attach, createEvent, forward } from 'effector';

import { requestFx, Method } from '&front/application/api';

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

// Before start, hide tip from UI
forward({
  from: disableTipFx,
  to: tipHidden,
});

// After done, refetch tips
forward({
  from: disableTipFx.done,
  to: fetchTipsFx,
});

const $tips = createStore<TipModel[]>([])
  .on(fetchTipsFx.doneData, (_, { data }) => data)
  .on(tipHidden, (state, disabledToken) =>
    state.filter((tip) => tip.token !== disabledToken),
  );

export { $tips, fetchTipsFx, disableTipFx, tipHidden };
