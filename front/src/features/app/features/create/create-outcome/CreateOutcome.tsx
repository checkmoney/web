import { useCallback } from 'react'
import { Form } from 'react-final-form'
import { useMappedState } from 'redux-react-hook'

import { useCreateOutcome } from '@front/domain/money/hooks/useCreateOutcome'
import { getCreateOutcomeFetching } from '@front/domain/money/selectors/getCreateOutcomeFetching'
import {
  DatePicker,
  EnumSelect,
  Input,
  InputMoney,
} from '@front/features/final-form'
import { getCurrencyName } from '@front/helpers/getCurrencyName'
import { Label } from '@front/ui/atoms/label'
import { LoadingButton } from '@front/ui/atoms/loading-button'
import { Card } from '@front/ui/molecules/card'
import { Currency } from '@shared/enum/Currency'
import { OutcomeModel } from '@shared/models/money/OutcomeModel'

import * as styles from '../SimpleForm.css'

interface Props {
  className?: string
}

export const CreateOutcome = ({ className }: Props) => {
  const create = useCreateOutcome()

  const fieldsToOutcomeModel = useCallback(
    ({ amount, category, currency, date }: any): OutcomeModel => ({
      amount: Math.round(parseFloat(amount) * 100),
      currency,
      category,
      date,
    }),
    [],
  )

  const onSubmit = useCallback(async fields => {
    const outcome = fieldsToOutcomeModel(fields)
    await create(outcome)
  }, [])

  const fetching = useMappedState(getCreateOutcomeFetching)

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
          <Card title="Create new outcome" className={styles.form}>
            <Label text="Amount" className={styles.amount}>
              <InputMoney name="amount" currency={values.currency} />
            </Label>

            <Label text="Category" className={styles.comment}>
              <Input name="category" placeholder="Cafe" />
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
