import { useMemo } from 'react'
import { sortBy } from 'lodash'

import { Currency } from '@shared/enum/Currency'
import { displayMoney } from '@shared/helpers/displayMoney'
import { Table } from '@front/ui/components/layout/table'

interface Props {
  className?: string
  currency: Currency
}

export const Categories = ({ className, currency }: Props) => {
  const columns = useMemo(
    () => ({
      source: {
        title: 'Category',
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
      title="Where was the money spent"
      columns={columns}
      data={fakeDate}
      hideHeader
      className={className}
    />
  )
}
