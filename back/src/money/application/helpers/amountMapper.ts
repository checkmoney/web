import { Income } from '@back/money/domain/Income.entity'
import { Outcome } from '@back/money/domain/Outcome.entity'

export const amountMapper = (item: Income | Outcome) => item.amount
