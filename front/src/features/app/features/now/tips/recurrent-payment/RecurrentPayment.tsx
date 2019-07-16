import React from 'react'
import { setDate } from 'date-fns'

import { TipModel } from '&shared/models/mind/TipModel'
import { Card } from '&front/ui/components/layout/card'
import { displayMoney } from '&shared/helpers/displayMoney'
import { formatDate } from '&shared/helpers/formatDate'
import { useTranslation } from '&front/domain/i18n'

import { RecurrentPaymentMeta } from './RecurrentPaymentMeta'
import { DismissButton } from '../components/dismiss-button'

interface Props {
  tip: TipModel<RecurrentPaymentMeta>
}

export const RecurrentPayment = ({ tip: { meta, token } }: Props) => {
  const { t } = useTranslation()

  const { amount, currency, period, category } = meta

  const now = new Date()
  const startDate = setDate(now, period.from)
  const endDate = setDate(now, period.to)

  const context = {
    start: formatDate(startDate),
    end: formatDate(endDate),
    outcome: displayMoney(currency)(amount),
    category,
  }

  return (
    <Card
      title={t('tips:recurrent.title')}
      extra={<DismissButton token={token} />}
    >
      {t('tips:recurrent.content', context)}
    </Card>
  )
}
