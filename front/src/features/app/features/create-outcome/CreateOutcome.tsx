import { useCallback } from 'react'
import { Field, Form } from 'react-final-form'

import { Currency } from '@shared/enum/Currency'
import { OutcomeModel } from '@shared/models/money/OutcomeModel'

import { useCreateOutcome } from '@front/domain/money/hooks/useCreateOutcome'

export const CreateOutcome = () => {
  const create = useCreateOutcome()

  const fieldsToOutcomeModel = useCallback(
    ({ amount, category, currency }: any): OutcomeModel => ({
      amount: Math.round(parseFloat(amount) * 100),
      currency,
      category,
      date: new Date(),
    }),
    [],
  )

  const onSubmit = useCallback(async fields => {
    const outcome = fieldsToOutcomeModel(fields)
    await create(outcome)
  }, [])

  return (
    <Form onSubmit={onSubmit} initialValues={{ currency: Currency.RUB }}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <h2>Create new outcome</h2>

          <div>
            <label>Amount</label>
            <Field
              name="amount"
              component="input"
              placeholder="12"
              type="number"
            />
          </div>

          <div>
            <label>Category</label>
            <Field name="category" component="input" placeholder="Cafe" />
          </div>

          <div>
            <label>Source</label>
            <div>
              {Object.values(Currency).map(value => (
                <label>
                  <Field
                    name="currency"
                    component="input"
                    type="radio"
                    value={value}
                    key={value}
                  />{' '}
                  {value}
                </label>
              ))}
            </div>
          </div>

          <button type="submit">create</button>
        </form>
      )}
    </Form>
  )
}
