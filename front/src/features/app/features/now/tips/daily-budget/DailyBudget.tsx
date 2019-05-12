import { TipModel } from '@shared/models/mind/TipModel'
import { displayMoney } from '@shared/helpers/displayMoney'
import { Card } from '@front/ui/components/layout/card'
import { useTranslation } from '@front/domain/i18n'

import { DailyBudgetMeta } from './DailyBudgetMeta'

interface Props {
  tip: TipModel<DailyBudgetMeta>
}

export const DailyBudget = ({ tip: { meta } }: Props) => {
  const { t } = useTranslation()

  if (meta.amount === 0) {
    return (
      <Card title={t('daily-budget.title')}>
        {t('daily-budget.content.empty')}
      </Card>
    )
  }

  const budget = displayMoney(meta.currency)(meta.amount, { withPenny: false })

  return (
    <Card title={t('daily-budget.title')}>
      {t('daily-budget.content.full', { budget })}
    </Card>
  )
}
