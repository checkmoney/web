import { displayMoney } from '@front/helpers/displayMoney'
import { displayNullableDate } from '@front/helpers/displayNullableDtae'
import { Table } from '@front/ui/molecules/table'
import { IncomeModel } from '@shared/models/money/IncomeModel'

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
