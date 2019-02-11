import { initializeStore } from './initializeStore'
import { State } from './State'
import { actualizeStore } from './utils/actualizeStore'
import { markOptions } from './utils/markOptions'

const isServer = typeof window === 'undefined'
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__'

export const getOrCreateStore = (initialState?: State) => {
  if (isServer) {
    markOptions(initialState)
  }

  const state = actualizeStore(initialState)

  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return initializeStore(state)
  }

  // Create store if unavailable on the client and set it on the window object
  // prettier-ignore
  if (!(window as any)[__NEXT_REDUX_STORE__]) {
    (window as any)[__NEXT_REDUX_STORE__] = initializeStore(state)
  }

  return (window as any)[__NEXT_REDUX_STORE__]
}
