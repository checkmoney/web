import { Option } from 'tsoption';

import { createCachedPeriodKey } from '&front/domain/cached-data';
import { State } from '&front/domain/store';
import { GroupBy } from '&shared/enum/GroupBy';

export const getHistory = (from: Date, to: Date, groupBy: GroupBy) => (
  state: State,
) =>
  Option.of(
    state.money.history.data.data[createCachedPeriodKey({ from, to, groupBy })],
  );
