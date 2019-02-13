import { useCallback } from 'react'
import { Field, Form } from 'react-final-form'

import { Currency } from '@shared/enum/Currency'
import { IncomeModel } from '@shared/models/money/IncomeModel'

import { useCreateIncome } from '@front/domain/money/hooks/useCreateIncome'

export const CreateIncome = () => {
  const create = useCreateIncome()

  const fieldsToIncomeModel = useCallback(
    ({ amount, source, currency, date }: any): IncomeModel => ({
      amount: Math.round(parseFloat(amount) * 100),
      currency,
      source,
      date: !!date ? new Date(date) : new Date(),
    }),
    [],
  )

  const onSubmit = useCallback(async fields => {
    const income = fieldsToIncomeModel(fields)
    await create(income)
  }, [])

  return (
    <Form onSubmit={onSubmit} initialValues={{ currency: Currency.RUB }}>
      {({ handleSubmit, form: { initialize }, initialValues }) => (
        <form
          onSubmit={e => handleSubmit(e)!.then(() => initialize(initialValues))}
        >
          <h2>Create new income</h2>

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
            <label>Source</label>
            <Field name="source" component="input" placeholder="NASA" />
          </div>

          <div>
            <label>Source</label>
            <div>
              {Object.values(Currency).map(value => (
                <label key={value}>
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

          <div>
            <label>Date</label>
            <Field name="date" component="input" type="date" />
          </div>

          <button type="submit">create</button>
        </form>
      )}
    </Form>
  )
}
