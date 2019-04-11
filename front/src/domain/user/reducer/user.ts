import {
  ClearAction,
  createClearReduxWithFetching,
  FetchingState,
} from 'redux-clear'
import { Option } from 'tsoption'

import { Currency } from '@shared/enum/Currency'
import { ProfileModel } from '@shared/models/user/ProfileModel'

interface State extends FetchingState {
  data: { profile: { defaultCurrency: Currency } }
}
interface Actions {
  getProfile: ClearAction<[ProfileModel]>
}

const { reducer, actions } = createClearReduxWithFetching<State, Actions>(
  {
    getProfile: state => profile => {
      return {
        ...state,
        profile,
      }
    },
  },
  {
    data: {
      profile: {
        defaultCurrency: Currency.USD,
      },
    },
    error: Option.of(null),
    loading: false,
  },
  'user-data',
)

export { State, reducer, actions }
