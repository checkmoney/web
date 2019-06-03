import { State } from '$front/domain/store'

export const getCreateTipFetching = (state: State) =>
  state.mind.createTipFetching
