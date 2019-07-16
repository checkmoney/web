import { State } from '&front/domain/store'

export const getToken = (state: State) => state.user.data.token
