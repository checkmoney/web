import { displayMoney } from '@front/helpers/displayMoney'
import { displayNullableDate } from '@front/helpers/displayNullableDtae'
import { Table } from '@front/ui/components/layout/table'
import { IncomeModel } from '@shared/models/money/IncomeModel'

import { DeleteButton } from './DeleteButton'

interface Props {
  incomes: IncomeModel[]
  className?: string
  periodName: string
}

const columns = {
  date: {
    title: 'Date',
    transform: displayNullableDate,
  },
  amount: {
    title: 'Amount',
  },
  source: {
    title: 'Source',
  },
  id: {
    title: 'Actions',
    transform: (id: string) => <DeleteButton id={id} />,
  },
}

export const Incomes = ({ incomes, periodName, className }: Props) => (
  <Table
    title={`Incomes: ${periodName}`}
    className={className}
    data={incomes.map(income => ({
      ...income,
      amount: displayMoney(income.currency)(income.amount),
    }))}
    columns={columns}
  />
)
