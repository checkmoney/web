import { useStore, useGate } from 'effector-react';
import React from 'react';
import { Form, Field } from 'react-final-form';
import { useSelector } from 'react-redux';

import { getCreateIncomeFetching } from '&front/domain/money/selectors/getCreateIncomeFetching';
import { getCreateOutcomeFetching } from '&front/domain/money/selectors/getCreateOutcomeFetching';
import {
  DatePicker,
  InputMoney,
  Toggle,
  AutoComplete,
} from '&front/features/final-form';
import { mergeFetchingState } from '&front/helpers/mergeFetchingState';
import { Variant } from '&front/ui/components/form/toggle/Variant';
import { Card } from '&front/ui/components/layout/card';
import {
  $currency,
  CurrencyGate,
  CurrencySelect,
} from '&front/application/currency';
import {
  ExistsCategoriesGate,
  $existCategories,
} from '&front/application/transaction';
import { Skeleton } from '&front/ui/components/controls/skeleton/Skeleton';
import { Button, Label } from '&front/presentation/atoms';

import * as styles from './CreateTransaction.css';
import { getCommentByKind } from './helpers/getCommentByKind';
import { getExampleByKind } from './helpers/getExampleByKind';
import { Kind } from './helpers/Kind';
import { useOnSubmit } from './helpers/useOnSubmit';

interface Props {
  className?: string;
}

export const CreateTransaction = ({ className }: Props) => {
  useGate(CurrencyGate);
  useGate(ExistsCategoriesGate);

  const defaultCurrency = useStore($currency);
  const existCategories = useStore($existCategories);

  const onSubmit = useOnSubmit();

  const isLoaded = defaultCurrency;

  const outcomeFetching = useSelector(getCreateOutcomeFetching);
  const incomeFetching = useSelector(getCreateIncomeFetching);
  const fetching = mergeFetchingState(outcomeFetching, incomeFetching);

  const getVariants = (kind: Kind) =>
    ({
      [Kind.Income]: existCategories.earnings,
      [Kind.Outcome]: existCategories.expenses,
    }[kind]);

  if (!isLoaded) {
    return (
      <Card title="Новая транзакция">
        <Skeleton rows={7} />
      </Card>
    );
  }

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{
        currency: defaultCurrency,
        date: new Date(),
        kind: Kind.Outcome,
      }}
    >
      {({ handleSubmit, form: { initialize }, values, initialValues }) => (
        <form
          onSubmit={(e) =>
            handleSubmit(e)!.then(() => initialize(initialValues))
          }
          className={className}
        >
          <Card title="Новая транзакция" className={styles.form}>
            <Label text="Сумма" className={styles.amount}>
              <InputMoney name="amount" currency={values.currency} />
            </Label>

            <Label
              text={getCommentByKind(values.kind)}
              className={styles.comment}
            >
              <AutoComplete
                name="comment"
                className={styles.input}
                placeholder={getExampleByKind(values.kind)}
                variants={getVariants(values.kind)}
              />
            </Label>

            <Label text="Валюта" className={styles.currency}>
              <Field name="currency">
                {({ input }) => (
                  <CurrencySelect
                    value={input.value}
                    onChange={input.onChange}
                  />
                )}
              </Field>
            </Label>

            <Label text="Дата" className={styles.date}>
              <DatePicker name="date" />
            </Label>

            <Toggle name="kind" className={styles.kind}>
              <Variant value={Kind.Outcome}>Расход</Variant>
              <Variant value={Kind.Income}>Доход</Variant>
            </Toggle>

            <Button
              loading={fetching.loading}
              type="submit"
              mod="primary"
              className={styles.submit}
            >
              Создать
            </Button>
          </Card>
        </form>
      )}
    </Form>
  );
};
