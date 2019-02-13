import { useCallback } from 'react'
import { useDispatch } from 'redux-react-hook'

import { OutcomeModel } from '@shared/models/money/OutcomeModel'

import { createOutcome } from '../actions/createOutcome'

export const useCreateOutcome = () => {
  const dispatch = useDispatch()

  return useCallback(
    (outcome: OutcomeModel): Promise<any> =>
      dispatch(createOutcome(outcome) as any),
    [],
  )
}
