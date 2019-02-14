import { Option } from 'tsoption'

import { IncomeModel } from '@shared/models/money/IncomeModel'

interface Props {
  incomes: IncomeModel[]
}

export const Incomes = ({ incomes }: Props) => (
  <>
    <h4>Incomes</h4>
    {incomes.map(({ amount, currency, source, date }) => (
      <p>
        {Option.of(date)
          .map(_ => _.toDateString())
          .getOrElse('')}
        {' — '}
        {amount / 100} {currency} ({source})
      </p>
    ))}
  </>
)
