import { useCallback } from 'react'
import { Form } from 'react-final-form'
import { useMappedState } from 'redux-react-hook'

import { createIncome } from '@front/domain/money/actions/createIncome'
import { getCreateIncomeFetching } from '@front/domain/money/selectors/getCreateIncomeFetching'
import { useThunk } from '@front/domain/store'
import {
  DatePicker,
  EnumSelect,
  Input,
  InputMoney,
} from '@front/features/final-form'
import { getCurrencyName } from '@shared/helpers/getCurrencyName'
import { Label } from '@front/ui/components/form/label'
import { LoadingButton } from '@front/ui/components/form/loading-button'
import { Card } from '@front/ui/components/layout/card'
import { Currency } from '@shared/enum/Currency'
import { IncomeModel } from '@shared/models/money/IncomeModel'

import * as styles from '../SimpleForm.css'

interface Props {
  className?: string
}

export const CreateIncome = ({ className }: Props) => {
  const dispatch = useThunk()

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
    await dispatch(createIncome(income))
  }, [])

  const fetching = useMappedState(getCreateIncomeFetching)

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{ currency: Currency.RUB, date: new Date() }}
    >
      {({ handleSubmit, form: { initialize }, values, initialValues }) => (
        <form
          onSubmit={e => handleSubmit(e)!.then(() => initialize(initialValues))}
          className={className}
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

            <LoadingButton fethcing={fetching} submit className={styles.submit}>
              Create
            </LoadingButton>
          </Card>
        </form>
      )}
    </Form>
  )
}
