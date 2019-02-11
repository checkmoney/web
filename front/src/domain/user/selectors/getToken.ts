import { State } from '@front/domain/store/State'

export const getToken = (state: State) => state.user.data.token
