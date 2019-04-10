import { useCallback } from 'react'
import { TipModel } from '@shared/models/mind/TipModel'
import { displayMoney } from '@shared/helpers/displayMoney'
import { Card } from '@front/ui/components/layout/card'
import { Button, ButtonType } from '@front/ui/components/form/button'
import { useThunk } from '@front/domain/store'
import { disableTips } from '@front/domain/mind/actions/disableTips'
import { DailyBudgetMeta } from './DailyBudgetMeta'
import * as styles from '../components/merge/Merge.css'

import { DailyBudgetMeta } from './DailyBudgetMeta'

interface Props {
  tip: TipModel<DailyBudgetMeta>
}

export const DailyBudget = ({ tip: { token, meta } }: Props) => {
  const dispatch = useThunk()
  const onDismiss = useCallback(() => dispatch(disableTips([token])), [token])

  return (
    <div className={styles.card}>
      <Card
        title={`Your daily budget`}
        extra={
          <Button type={ButtonType.Text} onClick={onDismiss}>
            Dismiss
          </Button>
        }
      >
        Your preferred budget today is{' '}
        {displayMoney(meta.currency)(meta.amount)}
      </Card>
    </div>
  )
}
