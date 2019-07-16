import { useCallback } from 'react'

import { useThunk } from '&front/domain/store'
import { createIncome } from '&front/domain/money/actions/createIncome'
import { createOutcome } from '&front/domain/money/actions/createOutcome'

import { fieldsToIncomeModel } from './fieldsToIncomeModel'
import { fieldsToOutcomeModel } from './fieldsToOutcomeModel'
import { Kind } from './Kind'

export const useOnSubmit = () => {
  const dispatch = useThunk()

  const onSubmit = useCallback(async fields => {
    if (fields.kind === Kind.Income) {
      const income = fieldsToIncomeModel(fields)
      await dispatch(createIncome(income))
    }

    if (fields.kind === Kind.Outcome) {
      const outcome = fieldsToOutcomeModel(fields)
      await dispatch(createOutcome(outcome))
    }
  }, [])

  return onSubmit
}
