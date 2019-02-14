import { Income } from '@back/money/domain/Income.entity'
import { Outcome } from '@back/money/domain/Outcome.entity'
import { DateGroup } from '@back/utils/infrastructure/dateGroups/DateGroup'

export const rangeFilter = ({ from, to }: DateGroup) => ({
  date,
}: Income | Outcome) => date >= from && date < to
