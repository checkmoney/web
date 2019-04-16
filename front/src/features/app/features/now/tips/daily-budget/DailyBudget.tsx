import { TipModel } from '@shared/models/mind/TipModel'
import { displayMoney } from '@shared/helpers/displayMoney'
import { Card } from '@front/ui/components/layout/card'

import { DailyBudgetMeta } from './DailyBudgetMeta'

interface Props {
  tip: TipModel<DailyBudgetMeta>
}

export const DailyBudget = ({ tip: { meta } }: Props) => {
  if (meta.amount === 0) {
    return (
      <Card title={`Your daily budget`}>
        You have spent all the money today
      </Card>
    )
  }

  return (
    <Card title={`Your daily budget`}>
      Your preferred budget today is{' '}
      {displayMoney(meta.currency)(meta.amount, { withPenny: false })}
    </Card>
  )
}
