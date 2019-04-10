import { TipModel } from '@shared/models/mind/TipModel'
import { displayMoney } from '@shared/helpers/displayMoney'
import { Card } from '@front/ui/components/layout/card'

import { DailyBudgetMeta } from './DailyBudgetMeta'
import * as styles from '../components/merge/Merge.css'

interface Props {
  tip: TipModel<DailyBudgetMeta>
}

export const DailyBudget = ({ tip: { meta } }: Props) => {
  return (
    <div className={styles.card}>
      <Card title={`Your daily budget`}>
        Your preferred budget today is{' '}
        {displayMoney(meta.currency)(meta.amount, { withPenny: false })}
      </Card>
    </div>
  )
}
