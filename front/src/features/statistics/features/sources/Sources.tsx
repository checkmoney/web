import { useMemo } from 'react'
import { sortBy } from 'lodash'

import { Table } from '@front/ui/components/layout/table'
import { displayMoney } from '@shared/helpers/displayMoney'
import { Currency } from '@shared/enum/Currency'

interface Props {
  className?: string
  currency: Currency
}

export const Sources = ({ className, currency }: Props) => {
  const columns = useMemo(
    () => ({
      source: {
        title: 'Source',
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
      title="Sources of income"
      columns={columns}
      data={fakeDate}
      hideHeader
      className={className}
    />
  )
}
