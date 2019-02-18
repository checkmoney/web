import { useCallback } from 'react'
import { Field, Form } from 'react-final-form'

import { Currency } from '@shared/enum/Currency'
import { IncomeModel } from '@shared/models/money/IncomeModel'

import { useCreateIncome } from '@front/domain/money/hooks/useCreateIncome'
import { Input, InputMoney } from '@front/features/final-form'
import { Button } from '@front/ui/atoms/button'
import { Label } from '@front/ui/atoms/label'

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
      {({ handleSubmit, form: { initialize }, values, initialValues }) => (
        <form
          onSubmit={e => handleSubmit(e)!.then(() => initialize(initialValues))}
        >
          <h2>Create new income</h2>

          <Label text="Amount">
            <InputMoney name="amount" currency={values.currency} />
          </Label>

          <Label text="Source">
            <Input name="source" placeholder="NASA" />
          </Label>

          <Label text="Currency">
            {Object.values(Currency).map(value => (
              <Label text={value} key={value} after>
                <Field
                  name="currency"
                  component="input"
                  type="radio"
                  value={value}
                  key={value}
                />
              </Label>
            ))}
          </Label>

          <Label text="Date">
            <Field name="date" component="input" type="date" />
          </Label>

          <Button submit>Create</Button>
        </form>
      )}
    </Form>
  )
}
