import { CachedPeriod } from './CachedPeriod'

export interface CachedState<T> {
  data: {
    [key: string]: T[]
  }
  cachedPeriods: CachedPeriod[]
}
