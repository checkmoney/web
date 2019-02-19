import { Option } from 'tsoption'

import { OutcomeModel } from '@shared/models/money/OutcomeModel'

interface Props {
  outcomes: OutcomeModel[]
  className?: string
}

export const Outcomes = ({ outcomes, className }: Props) => (
  <section className={className}>
    <h4>Outcomes</h4>
    {outcomes.map(({ amount, currency, category, date }) => (
      <p key={`${amount}-${date}`}>
        {Option.of(date)
          .map(_ => _.toDateString())
          .getOrElse('')}
        {' — '}
        {amount / 100} {currency} ({category})
      </p>
    ))}
  </section>
)
