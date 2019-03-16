import { OutcomeModel } from '@shared/models/money/OutcomeModel'

export const fieldsToOutcomeModel = ({
  amount,
  comment,
  currency,
  date,
}: any): OutcomeModel => ({
  amount: Math.round(parseFloat(amount) * 100),
  currency,
  category: comment,
  date,
})
