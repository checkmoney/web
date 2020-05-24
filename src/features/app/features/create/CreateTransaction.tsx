import React, { useCallback, useEffect } from 'react';
import { Form } from 'react-final-form';
import { useSelector, useDispatch } from 'react-redux';

import { fetchCategories } from '&front/domain/money/actions/fetchCategories';
import { fetchSources } from '&front/domain/money/actions/fetchSources';
import { getCategories } from '&front/domain/money/selectors/getCategories';
import { getCreateIncomeFetching } from '&front/domain/money/selectors/getCreateIncomeFetching';
import { getCreateOutcomeFetching } from '&front/domain/money/selectors/getCreateOutcomeFetching';
import { getSources } from '&front/domain/money/selectors/getSources';
import { useThunk } from '&front/domain/store';
import {
  DatePicker,
  EnumSelect,
  InputMoney,
  Toggle,
  AutoComplete,
} from '&front/features/final-form';
import { mergeFetchingState } from '&front/helpers/mergeFetchingState';
import { translatedCurrency } from '&front/helpers/translatedCurrency';
import { Label } from '&front/ui/components/form/label';
import { LoadingButton } from '&front/ui/components/form/loading-button';
import { Variant } from '&front/ui/components/form/toggle/Variant';
import { Card } from '&front/ui/components/layout/card';
import { Currency } from '&shared/enum/Currency';
import { actions as requireActions } from '&front/app/utility/require.actions';
import { RequireType } from '&front/app/utility/require.types';
import {
  selectDefaultCurrency,
  selectDefaultCurrencyIsAvailable,
} from '&front/app/profile/default_currency.selectors';
import { Skeleton } from '&front/ui/components/controls/skeleton/Skeleton';

import * as styles from './CreateTransaction.css';
import { getCommentByKind } from './helpers/getCommentByKind';
import { getExampleByKind } from './helpers/getExampleByKind';
import { Kind } from './helpers/Kind';
import { useOnSubmit } from './helpers/useOnSubmit';

interface Props {
  className?: string;
}

export const CreateTransaction = ({ className }: Props) => {
  const dispatchThunk = useThunk();
  const dispatch = useDispatch();

  const onSubmit = useOnSubmit();

  const defaultCurrency = useSelector(selectDefaultCurrency);
  const isLoaded = useSelector(selectDefaultCurrencyIsAvailable);

  const outcomeFetching = useSelector(getCreateOutcomeFetching);
  const incomeFetching = useSelector(getCreateIncomeFetching);
  const fetching = mergeFetchingState(outcomeFetching, incomeFetching);

  const existSources = useSelector(getSources);
  const existCategories = useSelector(getCategories);
  useEffect(() => {
    dispatchThunk(fetchSources());
    dispatchThunk(fetchCategories());

    dispatch(requireActions.dataRequired(RequireType.DefaultCurrency));
  }, []);

  const getVariants = useCallback(
    (kind: Kind) =>
      ({
        [Kind.Income]: existSources,
        [Kind.Outcome]: existCategories,
      }[kind]),
    [existSources, existCategories],
  );

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
                placeholder={getExampleByKind(values.kind)}
                variants={getVariants(values.kind)}
              />
            </Label>

            <Label text="Валюта" className={styles.currency}>
              <EnumSelect
                showSearch
                name="currency"
                options={Currency}
                getLabel={translatedCurrency}
              />
            </Label>

            <Label text="Дата" className={styles.date}>
              <DatePicker name="date" />
            </Label>

            <Toggle name="kind" className={styles.kind}>
              <Variant value={Kind.Outcome}>Расход</Variant>
              <Variant value={Kind.Income}>Доход</Variant>
            </Toggle>

            <LoadingButton fethcing={fetching} submit className={styles.submit}>
              Создать
            </LoadingButton>
          </Card>
        </form>
      )}
    </Form>
  );
};
