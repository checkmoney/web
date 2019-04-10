import {
  ClearAction,
  createClearReduxWithFetching,
  FetchingState,
} from 'redux-clear'
import { Currency } from '@shared/enum/Currency'
import { UserProfile } from '../actions/UserProfile'
import { Option } from 'tsoption'

interface State extends FetchingState {
  data: { profile: { defaultCurrency: Currency } }
}
interface Actions {
  setCurrency: ClearAction<[Currency]>
  getProfile: ClearAction<[UserProfile]>
}

const { reducer, actions } = createClearReduxWithFetching<State, Actions>(
  {
    setCurrency: state => (defaultCurrency: Currency) => ({
      ...state,
      profile: {
        defaultCurrency,
      },
    }),
    getProfile: state => (profile: UserProfile) => {
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
