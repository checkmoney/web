import { useCallback } from 'react'
import { Field, Form } from 'react-final-form'

import { useCreateIncome } from '@front/domain/money/hooks/useCreateIncome'
import { EnumSelect, Input, InputMoney } from '@front/features/final-form'
import { getCurrencyName } from '@front/helpers/getCurrencyName'
import { Button } from '@front/ui/atoms/button'
import { Label } from '@front/ui/atoms/label'
import { Currency } from '@shared/enum/Currency'
import { IncomeModel } from '@shared/models/money/IncomeModel'

import * as styles from '../SimpleForm.css'

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
          className={styles.form}
        >
          <h2 className={styles.title}>Create new income</h2>

          <Label text="Amount" className={styles.amount}>
            <InputMoney name="amount" currency={values.currency} />
          </Label>

          <Label text="Source" className={styles.comment}>
            <Input name="source" placeholder="NASA" />
          </Label>

          <Label text="Currency" className={styles.currency}>
            <EnumSelect
              name="currency"
              options={Currency}
              getLabel={getCurrencyName}
            />
          </Label>

          <Label text="Date" className={styles.date}>
            <Field name="date" component="input" type="date" />
          </Label>

          <Button className={styles.submit} submit>
            Create
          </Button>
        </form>
      )}
    </Form>
  )
}
