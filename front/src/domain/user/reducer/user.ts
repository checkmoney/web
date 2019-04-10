import {
  ClearAction,
  createClearReduxWithFetching,
  FetchingState,
} from 'redux-clear'
import { Currency } from '@shared/enum/Currency'
import { UserProfile } from '../actions/UserProfile'

interface State extends FetchingState {
  profile: { defaultCurrency: Currency }
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
    getProfile: state => (profile: UserProfile) => ({
      ...state,
      profile,
    }),
  },
  {
    profile: {
      defaultCurrency: Currency.USD,
    },
    error: Error as any,
    loading: false,
  },
  'user-data',
)

export { State, reducer, actions }
