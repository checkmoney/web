import React from 'react'
import { format } from 'date-fns'

import { GroupBy } from '$shared/enum/GroupBy'
import { Card } from '$front/ui/components/layout/card'
import { useTranslation } from '$front/domain/i18n'
import { translatedMonthTitle } from '$front/helpers/translatedMonthTitle'

import { ShowYear } from '../components/show-year'
import { ShowMonth } from '../components/show-month'
import { ShowWhole } from '../components/show-whole'
import { Next, Prev } from '../components/next-prev'
import * as styles from './PeriodChooser.css'

interface Props {
  previousPeriodNumber: number
  setPreviousPeriodNumber: (t: (v: number) => number) => void
  from: Date
  to: Date
  group?: GroupBy
  detailType: string
}

export const PeriodChooser = ({
  from,
  group,
  setPreviousPeriodNumber,
  previousPeriodNumber,
  detailType,
}: Props) => {
  const { t } = useTranslation()

  const title = !group
    ? t('stats:details.all-time')
    : group === GroupBy.Year
    ? format(from, 'YYYY')
    : translatedMonthTitle(t, from)

  const actionProps = {
    setPreviousPeriodNumber,
    previousPeriodNumber,
    group,
  }

  return (
    <Card
      title={title}
      actions={[
        <Prev key="prev" {...actionProps} />,
        <Next key="next" {...actionProps} />,
      ]}
      className={styles.card}
    >
      <ShowYear group={group} detailType={detailType} />
      <ShowMonth group={group} detailType={detailType} />
      <ShowWhole group={group} detailType={detailType} />
    </Card>
  )
}
