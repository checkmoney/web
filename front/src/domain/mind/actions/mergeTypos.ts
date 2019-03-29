import { fetchOrFail } from '@front/domain/store'

import { actions } from '../reducer/tips'

export const mergeTypos = (token: string, main: string, other: string[]) =>
  fetchOrFail(actions.fetching, async dispatch => {
    // TODO: real merging please =)
    console.log(main, other)

    dispatch(actions.data.removeTips([token]))
  })
