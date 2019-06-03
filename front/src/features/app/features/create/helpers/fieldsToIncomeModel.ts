import { IncomeModel } from '$shared/models/money/IncomeModel'

export const fieldsToIncomeModel = ({
  amount,
  comment,
  currency,
  date,
}: any): IncomeModel => ({
  amount: Math.round(parseFloat(amount) * 100),
  currency,
  source: comment,
  date,
})
