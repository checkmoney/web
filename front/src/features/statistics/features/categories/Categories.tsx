import { useMemo } from 'react'
import { sortBy } from 'lodash'

import { Currency } from '@shared/enum/Currency'
import { displayMoney } from '@shared/helpers/displayMoney'
import { Table } from '@front/ui/components/layout/table'
import { GroupBy } from '@shared/enum/GroupBy'

interface Props {
  className?: string
  currency: Currency
  group: GroupBy.Month | GroupBy.Year
  widthPercent: number
}

export const Categories = ({
  className,
  currency,
  group,
  widthPercent,
}: Props) => {
  const columns = useMemo(
    () => ({
      source: {
        title: 'Category',
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
          { source: 'Cafe', amount: 50000 },
          { source: 'Lunch', amount: 40000 },
          { source: 'Travel', amount: 45000 },
        ],
        '-amount',
      ),
    [],
  )

  return (
    <Table
      title={`What did you spend money on this ${group}`}
      columns={columns}
      data={fakeDate}
      hideHeader
      className={className}
    />
  )
}
