import { uniqWith } from 'lodash'
import {
  ClearAction,
  WithFetchingState,
  createClearReduxWithFetching,
} from 'redux-clear'

import { correctArrayLength } from '@front/helpers/correctArrayLength'
import { correctObjectLength } from '@front/helpers/correctObjectLength'
import { Currency } from '@shared/enum/Currency'
import { GroupBy } from '@shared/enum/GroupBy'
import { DateGroupModel } from '@shared/models/money/DateGroupModel'

import { createStatsKey } from '../helpers/createStatsKey'
import { isEquelStatsPeriods } from '../helpers/isEqualStatsPeriods'

interface CachedPeriod {
  groupBy: GroupBy
  from: Date
  to: Date
  currency: Currency
}

interface InternalState {
  data: {
    [key: string]: DateGroupModel[]
  }
  cachedPeriods: CachedPeriod[]
}

interface Actions {
  addStats: ClearAction<[CachedPeriod, DateGroupModel[]]>
}

type State = WithFetchingState<InternalState>

const MAX_HISTORY_LENGTH = 2

const { actions, reducer } = createClearReduxWithFetching<
  InternalState,
  Actions
>(
  {
    addStats: ({ data, cachedPeriods, ...state }) => (period, newStats) => {
      const { from, to, groupBy, currency } = period
      const key = createStatsKey(from, to, groupBy, currency)

      const oldData = correctObjectLength(data, MAX_HISTORY_LENGTH)
      const oldPeriods = correctArrayLength(cachedPeriods, MAX_HISTORY_LENGTH)

      return {
        ...state,
        data: {
          ...oldData,
          [key]: newStats,
        },
        cachedPeriods: uniqWith([...oldPeriods, period], isEquelStatsPeriods),
      }
    },
  },
  {
    data: {},
    cachedPeriods: [],
  },
)

export { State, actions, reducer }
