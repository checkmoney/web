import { Intersection } from 'utility-types'

import { CategoryGroupOutcomeModel } from '@shared/models/money/CategoryGroupOutcomeModel'
import { SourceGroupIncomeModel } from '@shared/models/money/SourceGroupIncomeModel'

export type SummedGroup<T extends string, K extends string> = Intersection<
  CategoryGroupOutcomeModel,
  SourceGroupIncomeModel
> &
  { [key in T]: string } &
  { [key in K]: number }
