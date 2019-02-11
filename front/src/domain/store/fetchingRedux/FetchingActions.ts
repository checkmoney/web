import { ClearAction } from 'redux-clear'

export interface FethcingActions {
  request: ClearAction
  failure: ClearAction<[string]>
  success: ClearAction
}
