import { createStore, attach } from 'effector';

import { PeriodType } from '&front/shared';
import { requestFx, Method } from '&front/application/api';

import { Grow } from '../types/grow';

const fetchGrowFx = attach({
  effect: requestFx,
  mapParams: (periodType: PeriodType) => ({
    path: `/v1/statistics/grow`,
    query: { periodType },
    method: Method.Get,
  }),
});

type GrowState = { [key in PeriodType]?: Grow };

const $grow = createStore<GrowState>({}).on(
  fetchGrowFx.done,
  (state, { params, result }) => ({ ...state, [params]: result.data }),
);

const selectGrowByPeriodType = (state: GrowState, [periodType]: [PeriodType]) =>
  state[periodType] || null;

export { $grow, selectGrowByPeriodType, fetchGrowFx };
