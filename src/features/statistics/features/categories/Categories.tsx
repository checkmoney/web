import { take } from 'lodash';
import React, { useMemo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Option } from 'tsoption';
import { useRouter } from 'react-router5';

import { Interval } from '&front/app/api/api.types';
import { actions } from '&front/app/statistics/categories.actions';
import {
  selectCategories,
  selectCategoriesHasError,
} from '&front/app/statistics/categories.selectors';
import { useMemoMappedState } from '&front/domain/store/useMemoMappedState';
import { createRangeForGroup } from '&front/helpers/createRangeForGroup';
import { Button } from '&front/presentation/atoms/button';
import { LoaderTable } from '&front/ui/components/layout/loader-table';
import { Currency } from '&front/application/profile';
import { PeriodType } from '&front/shared';
import { displayMoney } from '&front/helpers/displayMoney';
import { Route } from '&front/application/router';

interface Props {
  className?: string;
  currency: Currency;
  group: PeriodType.Month | PeriodType.Year;
  widthPercent: number;
  maxLength: number;
}

export const Categories = ({
  className,
  currency,
  group,
  widthPercent,
  maxLength,
}: Props) => {
  const columns = useMemo(
    () => ({
      category: {
        title: 'Category',
        widthPercent,
      },
      amount: {
        title: 'Amount',
        transform: displayMoney(currency),
      },
    }),
    [currency, widthPercent],
  );

  const { from, to } = useMemo(() => createRangeForGroup(group), [group]);
  const dateRange = useMemo(() => new Interval(from, to), [from, to]);
  const dispatch = useDispatch();
  const { navigate } = useRouter();

  useEffect(() => {
    dispatch(actions.started({ periodType: group, dateRange }));
  }, [group, dateRange]);

  const data = useMemoMappedState(selectCategories(group, dateRange), [
    group,
    dateRange,
  ]);
  const error = useMemoMappedState(selectCategoriesHasError(group, dateRange), [
    group,
    dateRange,
  ]);

  const preparedData = useMemo(
    () =>
      Option.of(data)
        .map((v) => v.expenses)
        .map((v) => take(v, maxLength)),
    [data, maxLength],
  );

  const errorState = error ? Option.of('Error') : Option.of<string>(null);

  return (
    <LoaderTable
      title="На что вы тратите деньги"
      columns={columns}
      data={preparedData}
      fetching={{ error: errorState, loading: preparedData.isEmpty() }}
      expectedRows={maxLength}
      className={className}
      hideHeader
      footer={
        <Button
          mod="ghost"
          onClick={() =>
            navigate(Route.DetailedStatistics, { type: 'categories', group })
          }
        >
          Подробнее
        </Button>
      }
    />
  );
};
