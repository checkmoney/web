import { useCallback } from 'react'
import { Form } from 'react-final-form'

import { useCreateIncome } from '@front/domain/money/hooks/useCreateIncome'
import {
  DatePicker,
  EnumSelect,
  Input,
  InputMoney,
} from '@front/features/final-form'
import { getCurrencyName } from '@front/helpers/getCurrencyName'
import { Button } from '@front/ui/atoms/button'
import { Label } from '@front/ui/atoms/label'
import { Card } from '@front/ui/molecules/card'
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
      date,
    }),
    [],
  )

  const onSubmit = useCallback(async fields => {
    const income = fieldsToIncomeModel(fields)
    await create(income)
  }, [])

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{ currency: Currency.RUB, date: new Date() }}
    >
      {({ handleSubmit, form: { initialize }, values, initialValues }) => (
        <form
          onSubmit={e => handleSubmit(e)!.then(() => initialize(initialValues))}
          className={styles.container}
        >
          <Card title="Create new income" className={styles.form}>
            <Label text="Amount" className={styles.amount}>
              <InputMoney name="amount" currency={values.currency} />
            </Label>

            <Label text="Source" className={styles.comment}>
              <Input name="source" placeholder="NASA" />
            </Label>

            <Label text="Currency" className={styles.currency}>
              <EnumSelect
                showSearch
                name="currency"
                options={Currency}
                getLabel={getCurrencyName}
              />
            </Label>

            <Label text="Date" className={styles.date}>
              <DatePicker name="date" />
            </Label>

            <Button submit className={styles.submit}>
              Create
            </Button>
          </Card>
        </form>
      )}
    </Form>
  )
}
