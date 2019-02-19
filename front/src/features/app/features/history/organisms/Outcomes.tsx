import { displayMoney } from '@front/helpers/displayMoney'
import { displayNullableDate } from '@front/helpers/displayNullableDtae'
import { Table } from '@front/ui/molecules/table'
import { OutcomeModel } from '@shared/models/money/OutcomeModel'

interface Props {
  outcomes: OutcomeModel[]
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
  category: {
    title: 'Category',
  },
}

export const Outcomes = ({ outcomes, periodName, className }: Props) => (
  <Table
    title={`Outcomes: ${periodName}`}
    className={className}
    data={outcomes.map(outcome => ({
      ...outcome,
      amount: displayMoney(outcome.currency)(outcome.amount),
    }))}
    columns={columns}
  />
)
