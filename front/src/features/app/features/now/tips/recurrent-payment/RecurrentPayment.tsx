import { setDate } from 'date-fns'

import { TipModel } from '@shared/models/mind/TipModel'
import { Card } from '@front/ui/components/layout/card'
import { displayMoney } from '@shared/helpers/displayMoney'
import { formatDate } from '@shared/helpers/formatDate'

import { RecurrentPaymentMeta } from './RecurrentPaymentMeta'
import { DismissButton } from '../components/dismiss-button'

interface Props {
  tip: TipModel<RecurrentPaymentMeta>
}

export const RecurrentPayment = ({ tip: { meta, token } }: Props) => {
  const { amount, currency, period, category } = meta

  const now = new Date()
  const startDate = setDate(now, period.from)
  const endDate = setDate(now, period.to)

  return (
    <Card
      title={'Upcoming expense reminder'}
      extra={<DismissButton token={token} />}
    >
      I remind you that in the period from {formatDate(startDate)} to{' '}
      {formatDate(endDate)}, you have to spend{' '}
      <strong>
        {displayMoney(currency)(amount)} in the "{category}"
      </strong>{' '}
      category.
    </Card>
  )
}
