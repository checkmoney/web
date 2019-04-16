import { TipModel } from '@shared/models/mind/TipModel'

import { displayMoney } from '@shared/helpers/displayMoney'
import { Card } from '@front/ui/components/layout/card'

import { ExtraSpendingMeta } from './ExtraSpendingMeta'
import { DismissButton } from '../components/dismiss-button'

interface Props {
  tip: TipModel<ExtraSpendingMeta>
}

export const ExtraSpending = ({ tip: { token, meta } }: Props) => {
  return (
    <Card title={`Budget overrun`} extra={<DismissButton token={token} />}>
      You have spent this month{' '}
      {displayMoney(meta.currency)(meta.difference, { withPenny: false })} more
      than you can afford
    </Card>
  )
}
