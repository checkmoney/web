import { State } from '@front/domain/store/State'

export const getSignInFetching = (state: State) => state.user.signIn
