import React, { useCallback, useEffect } from 'react'
import { Form } from 'react-final-form'
import { useMappedState } from 'redux-react-hook'

import { getCreateOutcomeFetching } from '@front/domain/money/selectors/getCreateOutcomeFetching'
import { useThunk } from '@front/domain/store'
import {
  DatePicker,
  EnumSelect,
  InputMoney,
  Toggle,
  AutoComplete,
} from '@front/features/final-form'
import { Label } from '@front/ui/components/form/label'
import { LoadingButton } from '@front/ui/components/form/loading-button'
import { Card } from '@front/ui/components/layout/card'
import { Currency } from '@shared/enum/Currency'
import { Variant } from '@front/ui/components/form/toggle/Variant'
import { getCreateIncomeFetching } from '@front/domain/money/selectors/getCreateIncomeFetching'
import { mergeFetchingState } from '@front/helpers/mergeFetchingState'
import { getSources } from '@front/domain/money/selectors/getSources'
import { fetchSources } from '@front/domain/money/actions/fetchSources'
import { getCategories } from '@front/domain/money/selectors/getCategories'
import { fetchCategories } from '@front/domain/money/actions/fetchCategories'
import { getDefaultCurrency } from '@front/domain/user/selectors/getDefaultCurrency'
import { useTranslation } from '@front/domain/i18n'

import * as styles from './CreateTransaction.css'
import { Kind } from './helpers/Kind'
import { getCommentByKind } from './helpers/getCommentByKind'
import { getExampleByKind } from './helpers/getExampleByKind'
import { useOnSubmit } from './helpers/useOnSubmit'
import { translatedCurrency } from '@front/helpers/translatedCurrency'

interface Props {
  className?: string
}

export const CreateTransaction = ({ className }: Props) => {
  const dispatch = useThunk()
  const { t } = useTranslation()

  const onSubmit = useOnSubmit()

  const defaultCurrency = useMappedState(getDefaultCurrency)

  const outcomeFetching = useMappedState(getCreateOutcomeFetching)
  const incomeFetching = useMappedState(getCreateIncomeFetching)
  const fetching = mergeFetchingState(outcomeFetching, incomeFetching)

  const existSources = useMappedState(getSources)
  const existCategories = useMappedState(getCategories)
  useEffect(() => {
    dispatch(fetchSources())
    dispatch(fetchCategories())
  }, [])

  const getVariants = useCallback(
    (kind: Kind) =>
      ({
        [Kind.Income]: existSources,
        [Kind.Outcome]: existCategories,
      }[kind]),
    [existSources, existCategories],
  )

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{
        currency: defaultCurrency,
        date: new Date(),
        kind: Kind.Income,
      }}
    >
      {({ handleSubmit, form: { initialize }, values, initialValues }) => (
        <form
          onSubmit={e => handleSubmit(e)!.then(() => initialize(initialValues))}
          className={className}
        >
          <Card title={t('create-transaction:title')} className={styles.form}>
            <Label text={t('transaction:amount')} className={styles.amount}>
              <InputMoney name="amount" currency={values.currency} />
            </Label>

            <Label
              text={t(getCommentByKind(values.kind))}
              className={styles.comment}
            >
              <AutoComplete
                name="comment"
                placeholder={getExampleByKind(values.kind)}
                variants={getVariants(values.kind)}
              />
            </Label>

            <Label text={t('transaction:currency')} className={styles.currency}>
              <EnumSelect
                showSearch
                name="currency"
                options={Currency}
                getLabel={translatedCurrency(t)}
              />
            </Label>

            <Label text={t('transaction:date')} className={styles.date}>
              <DatePicker name="date" />
            </Label>

            <Toggle name="kind" className={styles.kind}>
              <Variant value={Kind.Outcome}>{t('transaction:outcome')}</Variant>
              <Variant value={Kind.Income}>{t('transaction:income')}</Variant>
            </Toggle>

            <LoadingButton fethcing={fetching} submit className={styles.submit}>
              {t('create-transaction:action')}
            </LoadingButton>
          </Card>
        </form>
      )}
    </Form>
  )
}
