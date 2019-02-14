import { uniqWith } from 'lodash'
import { ClearAction, createClearRedux } from 'redux-clear'

import { correctArrayLength } from '@front/helpers/correctArrayLength'
import { correctObjectLength } from '@front/helpers/correctObjectLength'
import { GroupBy } from '@shared/enum/GroupBy'
import { HistoryGroupModel } from '@shared/models/money/HistoryGroupModel'

import { createHistoryKey } from '../helpers/createHistoryKey'
import { isEqueslHistoryPeriods } from '../helpers/isEqualHistoryPeriods'

interface CachedPeriod {
  groupBy: GroupBy
  from: Date
  to: Date
}

interface Data {
  [key: string]: HistoryGroupModel[]
}

interface State {
  data: Data
  cachedPeriods: CachedPeriod[]
}

interface Actions {
  addHistory: ClearAction<[CachedPeriod, HistoryGroupModel[]]>
}

const MAX_HISTORY_LENGTH = 2

const { actions, reducer } = createClearRedux<State, Actions>(
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
        cachedPeriods: uniqWith(
          [...oldPeriods, period],
          isEqueslHistoryPeriods,
        ),
      }
    },
  },
  {
    data: {},
    cachedPeriods: [],
  },
)

export { State, actions, reducer }
