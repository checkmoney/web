import { CachedState } from './CachedState';

export const createInitialState = <T>(): CachedState<T> => ({
  data: {},
  cachedPeriods: [],
});
