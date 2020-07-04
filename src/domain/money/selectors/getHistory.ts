import { Option } from 'tsoption';

import { createCachedPeriodKey } from '&front/domain/cached-data';
import { State } from '&front/domain/store';
import { PeriodType } from '&front/shared';

export const getHistory = (from: Date, to: Date, groupBy: PeriodType) => (
  state: State,
) =>
  Option.of(
    state.money.history.data.data[createCachedPeriodKey({ from, to, groupBy })],
  );
