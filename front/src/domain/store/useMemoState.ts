import { useCallback } from 'react'
import { useMappedState } from 'redux-react-hook'
import { State } from './State'

export const useMemoState = <T>(
  createSelector: () => (state: State) => T,
  deps: any[],
) => {
  const selector = useCallback(createSelector(), deps)

  const state = useMappedState(selector)

  return state
}
