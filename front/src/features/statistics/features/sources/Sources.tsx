import { useMemo } from 'react'
import { sortBy } from 'lodash'

import { Table } from '@front/ui/components/layout/table'
import { displayMoney } from '@shared/helpers/displayMoney'
import { Currency } from '@shared/enum/Currency'
import { GroupBy } from '@shared/enum/GroupBy'

interface Props {
  className?: string
  currency: Currency
  group: GroupBy.Month | GroupBy.Year
  widthPercent: number
}

export const Sources = ({
  className,
  currency,
  group,
  widthPercent,
}: Props) => {
  const columns = useMemo(
    () => ({
      source: {
        title: 'Source',
        widthPercent,
      },
      amount: {
        title: 'Amount',
        transform: displayMoney(currency),
      },
    }),
    [currency],
  )

  const fakeDate = useMemo(
    () =>
      sortBy(
        [
          { source: 'Breadhead', amount: 50000 },
          { source: 'Netology', amount: 40000 },
          { source: 'Whatever', amount: 45000 },
        ],
        '-amount',
      ),
    [],
  )

  return (
    <Table
      title={`What brought you money this ${group}`}
      columns={columns}
      data={fakeDate}
      hideHeader
      className={className}
    />
  )
}
