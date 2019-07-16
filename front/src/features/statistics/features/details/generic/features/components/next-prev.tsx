import React, { useCallback } from 'react'

import { GroupBy } from '&shared/enum/GroupBy'
import { Button, ButtonType } from '&front/ui/components/form/button'
import { useTranslation } from '&front/domain/i18n'

interface Props {
  group?: GroupBy
  previousPeriodNumber: number
  setPreviousPeriodNumber: (t: (v: number) => number) => void
}

export const Prev = ({ group, setPreviousPeriodNumber }: Props) => {
  const back = useCallback(() => setPreviousPeriodNumber(v => v + 1), [
    setPreviousPeriodNumber,
  ])

  const { t } = useTranslation()

  if (!group) {
    return null
  }

  return (
    <Button onClick={back} type={ButtonType.Text}>
      {t(`stats:details.prev-${group}`)}
    </Button>
  )
}

export const Next = ({
  group,
  previousPeriodNumber,
  setPreviousPeriodNumber,
}: Props) => {
  const next = useCallback(() => setPreviousPeriodNumber(v => v - 1), [
    setPreviousPeriodNumber,
  ])

  const { t } = useTranslation()

  if (!group || previousPeriodNumber <= 0) {
    return null
  }

  return (
    <Button onClick={next} type={ButtonType.Text}>
      {t(`stats:details.next-${group}`)}
    </Button>
  )
}
