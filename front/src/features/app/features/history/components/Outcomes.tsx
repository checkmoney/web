import { displayMoney } from '@shared/helpers/displayMoney'
import { displayNullableDate } from '@front/helpers/displayNullableDtae'
import { Table } from '@front/ui/components/layout/table'
import { OutcomeModel } from '@shared/models/money/OutcomeModel'

import { DeleteButton } from './DeleteButton'

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
  id: {
    title: 'Actions',
    transform: (id: string) => <DeleteButton id={id} />,
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
