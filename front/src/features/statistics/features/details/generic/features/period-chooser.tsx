import { format } from 'date-fns'
import { GroupBy } from '@shared/enum/GroupBy'
import { useCallback } from 'react'
import { Button, ButtonType } from '@front/ui/components/form/button'
import { Card } from '@front/ui/components/layout/card'

interface Props {
  previousPeriodNumber: number
  setPreviousPeriodNumber: (t: (v: number) => number) => void
  from: Date
  to: Date
  group: GroupBy
  detailType: string
}

export const PeriodChooser = ({
  from,
  to,
  group,
  setPreviousPeriodNumber,
  previousPeriodNumber,
  detailType,
}: Props) => {
  const back = useCallback(() => setPreviousPeriodNumber(v => v + 1), [
    setPreviousPeriodNumber,
  ])
  const next = useCallback(() => setPreviousPeriodNumber(v => v - 1), [
    setPreviousPeriodNumber,
  ])

  return (
    <Card
      title={'Period'}
      actions={[
        <Button
          onClick={back}
          type={ButtonType.Text}
        >{`Previous ${group}`}</Button>,
        previousPeriodNumber > 0 && (
          <Button
            onClick={next}
            type={ButtonType.Text}
          >{`Next ${group}`}</Button>
        ),
      ].filter(Boolean)}
    >
      <p>
        List of {detailType} for the period from{' '}
        <b>{format(from, 'YYYY.MM.DD')}</b> to <b>{format(to, 'YYYY.MM.DD')}</b>
      </p>
    </Card>
  )
}
