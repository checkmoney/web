import { ClearAction, createClearRedux } from 'redux-clear'

import { omitFirst } from '@front/helpers/omitFirst'
import { HistoryGroupModel } from '@shared/models/money/HistoryGroupModel'

interface State {
  [key: string]: HistoryGroupModel[]
}

interface Actions {
  addHistory: ClearAction<[string, HistoryGroupModel[]]>
}

const MAX_HISTORY_LENGTH = 10

const { actions, reducer } = createClearRedux<State, Actions>(
  {
    addHistory: state => (key, newHistory) => {
      const itemsCount = Object.keys(state).length

      const oldState =
        itemsCount > MAX_HISTORY_LENGTH ? omitFirst(state) : state

      return {
        ...oldState,
        [key]: newHistory,
      }
    },
  },
  {},
)

export { State, actions, reducer }
