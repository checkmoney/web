import { uniqWith } from 'lodash'
import {
  ClearAction,
  createClearReduxWithFetching,
  WithFetchingState,
} from 'redux-clear'

import { correctArrayLength } from '@front/helpers/correctArrayLength'
import { correctObjectLength } from '@front/helpers/correctObjectLength'
import { GroupBy } from '@shared/enum/GroupBy'
import { HistoryGroupModel } from '@shared/models/money/HistoryGroupModel'

import { createHistoryKey } from '../helpers/createHistoryKey'
import { isEqualHistoryPeriods } from '../helpers/isEqualHistoryPeriods'

interface CachedPeriod {
  groupBy: GroupBy
  from: Date
  to: Date
}

interface InternalState {
  data: {
    [key: string]: HistoryGroupModel[]
  }
  cachedPeriods: CachedPeriod[]
}

type State = WithFetchingState<InternalState>

interface Actions {
  addHistory: ClearAction<[CachedPeriod, HistoryGroupModel[]]>
}

const MAX_HISTORY_LENGTH = 2

const { actions, reducer } = createClearReduxWithFetching<
  InternalState,
  Actions
>(
  {
    addHistory: ({ data, cachedPeriods, ...state }) => (period, newHistory) => {
      const { from, to, groupBy } = period
      const key = createHistoryKey(from, to, groupBy)

      const oldData = correctObjectLength(data, MAX_HISTORY_LENGTH)
      const oldPeriods = correctArrayLength(cachedPeriods, MAX_HISTORY_LENGTH)

      return {
        ...state,
        data: {
          ...oldData,
          [key]: newHistory,
        },
        cachedPeriods: uniqWith([...oldPeriods, period], isEqualHistoryPeriods),
      }
    },
  },
  {
    data: {},
    cachedPeriods: [],
  },
)

export { State, actions, reducer }
