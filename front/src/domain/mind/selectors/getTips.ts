import { State } from '$front/domain/store'

export const getTips = (state: State) => state.mind.tips.data
