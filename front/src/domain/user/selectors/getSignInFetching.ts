import { State } from '$front/domain/store'

export const getSignInFetching = (state: State) => state.user.signIn
