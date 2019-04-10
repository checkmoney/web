import { TipModel } from '@shared/models/mind/TipModel'
import { displayMoney } from '@shared/helpers/displayMoney'

import { DailyBudgetMeta } from './DailyBudgetMeta'

interface Props {
  tip: TipModel<DailyBudgetMeta>
}

export const DailyBudget = ({ tip }: Props) => {
  return (
    <div>
      {' '}
      todays budget is {displayMoney(tip.meta.currency)(tip.meta.amount)}
    </div>
  )
}
