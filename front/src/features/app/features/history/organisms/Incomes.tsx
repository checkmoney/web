import { Option } from 'tsoption'

import { IncomeModel } from '@shared/models/money/IncomeModel'

interface Props {
  incomes: IncomeModel[]
  className?: string
}

export const Incomes = ({ incomes, className }: Props) => (
  <section className={className}>
    <h4>Incomes</h4>
    {incomes.map(({ amount, currency, source, date }) => (
      <p key={`${amount}-${date}`}>
        {Option.of(date)
          .map(_ => _.toDateString())
          .getOrElse('')}
        {' — '}
        {amount / 100} {currency} ({source})
      </p>
    ))}
  </section>
)
