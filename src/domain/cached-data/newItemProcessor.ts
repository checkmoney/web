import { uniqWith } from 'lodash';

import { correctArrayLength } from '&front/helpers/correctArrayLength';
import { correctObjectLength } from '&front/helpers/correctObjectLength';

import { CachedPeriod } from './CachedPeriod';
import { CachedState } from './CachedState';
import { createCachedPeriodKey } from './createCachedPeriodKey';
import { isEqualCachedPeriods } from './isEqualCachedPeriods';

const MAX_HISTORY_LENGTH = 10;

export const newItemProcessor = <T>({
  data,
  cachedPeriods,
  ...state
}: CachedState<T>) => (period: CachedPeriod, newItem: T[]) => {
  const key = createCachedPeriodKey(period);

  const oldData = correctObjectLength(data, MAX_HISTORY_LENGTH);
  const oldPeriods = correctArrayLength(cachedPeriods, MAX_HISTORY_LENGTH);

  return {
    ...state,
    data: {
      ...oldData,
      [key]: newItem,
    },
    cachedPeriods: uniqWith([...oldPeriods, period], isEqualCachedPeriods),
  };
};
