import { useCallback } from 'react'
import { useDispatch } from 'redux-react-hook'

import { IncomeModel } from '@shared/models/money/IncomeModel'

import { createIncome } from '../actions/createIncome'

export const useCreateIncome = () => {
  const dispatch = useDispatch()

  return useCallback(
    (income: IncomeModel): Promise<any> =>
      dispatch(createIncome(income) as any),
    [],
  )
}
